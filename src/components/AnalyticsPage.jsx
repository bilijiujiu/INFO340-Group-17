import { useEffect, useMemo, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { statusOptions } from '../data/applications'
import { database, firebaseConfigError } from '../firebase'
import SignInPrompt from './SignInPrompt'

const chartColors = ['#2563eb', '#16a34a', '#a16207', '#dc2626', '#7c3aed']

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip)

function buildStatusCounts(applications) {
  return statusOptions.map((status) => {
    const count = applications.filter((application) => application.status === status).length
    return {
      status,
      count,
    }
  })
}

function buildLocationData(applications) {
  const counts = applications.reduce((locationCounts, application) => {
    const location = application.location || 'Unknown'
    return {
      ...locationCounts,
      [location]: (locationCounts[location] || 0) + 1,
    }
  }, {})

  return Object.entries(counts).map(([location, count]) => ({
    location,
    count,
  }))
}

function snapshotToApplications(snapshotValue) {
  if (!snapshotValue) {
    return []
  }

  return Object.entries(snapshotValue).map(([id, application]) => ({
    id,
    ...application,
  }))
}

export default function AnalyticsPage({ user, authLoading, onSignIn }) {
  const [applications, setApplications] = useState([])
  const [roleFilter, setRoleFilter] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [isLoading, setIsLoading] = useState(Boolean(database) && Boolean(user))
  const [firebaseError, setFirebaseError] = useState(firebaseConfigError)

  useEffect(() => {
    if (!database || !user) {
      setApplications([])
      setIsLoading(false)
      return undefined
    }

    setIsLoading(true)
    const applicationsRef = ref(database, `users/${user.uid}/applications`)
    const unsubscribe = onValue(
      applicationsRef,
      (snapshot) => {
        setApplications(snapshotToApplications(snapshot.val()))
        setFirebaseError('')
        setIsLoading(false)
      },
      (error) => {
        setFirebaseError(error.message)
        setIsLoading(false)
      }
    )

    return unsubscribe
  }, [user])

  const filteredApplications = useMemo(() => {
    const roleQuery = roleFilter.trim().toLowerCase()
    const companyQuery = companyFilter.trim().toLowerCase()

    return applications.filter((application) => {
      const roleMatches =
        !roleQuery || application.role.toLowerCase().includes(roleQuery)
      const companyMatches =
        !companyQuery || application.company.toLowerCase().includes(companyQuery)
      return roleMatches && companyMatches
    })
  }, [applications, roleFilter, companyFilter])

  if (authLoading) {
    return (
      <main className="container app-page">
        <p className="feedback-message">Checking sign-in...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <SignInPrompt
        title="Sign in to view your analytics"
        message="Analytics summarize your own application history—status, locations, and response patterns."
        onSignIn={onSignIn}
      />
    )
  }

  const statusData = buildStatusCounts(filteredApplications)
  const locationData = buildLocationData(filteredApplications)
  const totalApplications = filteredApplications.length
  const interviewCount = filteredApplications.filter((application) => (
    application.status === 'Interview'
  )).length
  const offerCount = filteredApplications.filter((application) => (
    application.status === 'Offer'
  )).length
  const activeCount = filteredApplications.filter((application) => (
    application.status !== 'Rejected'
  )).length
  const interviewRate =
    totalApplications === 0 ? 0 : Math.round((interviewCount / totalApplications) * 100)
  const offerRate =
    totalApplications === 0 ? 0 : Math.round((offerCount / totalApplications) * 100)

  const pieChartData = {
    labels: statusData.map((entry) => entry.status),
    datasets: [
      {
        data: statusData.map((entry) => entry.count),
        backgroundColor: chartColors,
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  }

  const barChartData = {
    labels: locationData.map((entry) => entry.location),
    datasets: [
      {
        label: 'Applications',
        data: locationData.map((entry) => entry.count),
        backgroundColor: '#2563eb',
        borderRadius: 6,
      },
    ],
  }

  const barChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  const pieChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <main className="container app-page">
        <header className="page-header">
          <div>
            <h1 className="page-title">Analytics</h1>
            <p className="page-subtitle">
              Filter your tracked applications and review status, offer, and location patterns.
            </p>
          </div>
        </header>

        <form className="analytics-filter-form" onSubmit={(event) => event.preventDefault()}>
          <div className="filter-group">
            <label htmlFor="analytics-role">Preferred job type</label>
            <input
              id="analytics-role"
              type="text"
              className="filter-input"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              placeholder="Try intern, designer, data..."
            />
          </div>
          <div className="filter-group">
            <label htmlFor="analytics-company">Company</label>
            <input
              id="analytics-company"
              type="text"
              className="filter-input"
              value={companyFilter}
              onChange={(event) => setCompanyFilter(event.target.value)}
              placeholder="Try Google, Meta, Stripe..."
            />
          </div>
        </form>

        {firebaseError && (
          <p className="feedback-message warning" role="alert">
            {firebaseError}
          </p>
        )}

        {isLoading && <p className="feedback-message">Loading analytics...</p>}

        {totalApplications === 0 && (
          <p className="feedback-message warning" role="alert">
            No applications match those analytics filters yet.
          </p>
        )}

        <section className="analytics-kpi-grid" aria-label="Application summary">
          <article className="kpi-tile">
            <p className="kpi-label">Filtered Apps</p>
            <p className="kpi-value">{totalApplications}</p>
          </article>
          <article className="kpi-tile">
            <p className="kpi-label">Interview Rate</p>
            <p className="kpi-value">{interviewRate}%</p>
          </article>
          <article className="kpi-tile">
            <p className="kpi-label">Offer Rate</p>
            <p className="kpi-value">{offerRate}%</p>
          </article>
          <article className="kpi-tile">
            <p className="kpi-label">Active Leads</p>
            <p className="kpi-value">{activeCount}</p>
          </article>
        </section>

        <section className="analytics-chart-grid">
          <article className="panel">
            <h2 className="panel-title">Application Status Distribution</h2>
            <div className="chart-shell" aria-label="Pie chart of application statuses">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            <p className="insight">
              Interview and offer rates update as you narrow the tracked application set.
            </p>
          </article>

          <article className="panel">
            <h2 className="panel-title">Top Locations</h2>
            <div className="chart-shell" aria-label="Bar chart of application locations">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
            <p className="insight">
              Use location patterns to decide where to focus networking and follow-ups.
            </p>
          </article>
        </section>
    </main>
  )
}
