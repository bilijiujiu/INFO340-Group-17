import { useEffect, useMemo, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { Link } from 'react-router'
import { database, firebaseConfigError } from '../firebase'
import SignInPrompt from './SignInPrompt'

const summaryLabels = {
  Saved: 'Saved Jobs',
  Applied: 'Applied',
  Interview: 'Interviews',
  Offer: 'Offers',
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

function formatShortDate(value) {
  if (!value) {
    return '—'
  }

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function buildSummaryStats(applications) {
  return ['Saved', 'Applied', 'Interview', 'Offer'].map((status) => ({
    label: summaryLabels[status],
    count: String(applications.filter((application) => application.status === status).length),
  }))
}

function buildRecentApplications(applications) {
  return [...applications]
    .sort((a, b) => {
      const aTime = new Date(a.updatedAt || a.createdAt || 0).getTime()
      const bTime = new Date(b.updatedAt || b.createdAt || 0).getTime()
      return bTime - aTime
    })
    .slice(0, 5)
    .map((application) => ({
      id: application.id,
      company: application.company,
      role: application.role,
      status: application.status,
      statusClass: application.status.toLowerCase(),
      date: formatShortDate(application.updatedAt || application.createdAt),
    }))
}

function buildInsights(applications) {
  if (applications.length === 0) {
    return [
      { title: 'Top City', value: '—' },
      { title: 'Response Rate', value: '0%' },
      { title: 'Average Wait', value: '—' },
      { title: 'Next Deadline', value: '—' },
    ]
  }

  const locationCounts = applications.reduce((counts, application) => {
    const location = application.location?.trim() || 'Unknown'
    return {
      ...counts,
      [location]: (counts[location] || 0) + 1,
    }
  }, {})

  const topCity = Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0][0]

  const respondedCount = applications.filter((application) => (
    application.status !== 'Saved' && application.status !== 'Rejected'
  )).length
  const responseRate = Math.round((respondedCount / applications.length) * 100)

  const waitingApplications = applications.filter((application) => (
    ['Applied', 'Interview'].includes(application.status) && application.createdAt
  ))
  const averageWait = waitingApplications.length === 0
    ? '—'
    : `${Math.round(
      waitingApplications.reduce((totalDays, application) => {
        const days = Math.floor(
          (Date.now() - new Date(application.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        )
        return totalDays + days
      }, 0) / waitingApplications.length
    )} days`

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcomingDeadlines = applications
    .filter((application) => application.deadline)
    .map((application) => ({
      ...application,
      deadlineDate: new Date(application.deadline),
    }))
    .filter((application) => application.deadlineDate >= today)
    .sort((a, b) => a.deadlineDate - b.deadlineDate)

  const nextDeadline = upcomingDeadlines.length === 0
    ? '—'
    : `${upcomingDeadlines[0].company} · ${formatShortDate(upcomingDeadlines[0].deadline)}`

  return [
    { title: 'Top City', value: topCity },
    { title: 'Response Rate', value: `${responseRate}%` },
    { title: 'Average Wait', value: averageWait },
    { title: 'Next Deadline', value: nextDeadline },
  ]
}

function buildWelcomeMessage(applications) {
  if (applications.length === 0) {
    return 'Add your first application to start tracking progress.'
  }

  const now = new Date()
  const weekLater = new Date(now)
  weekLater.setDate(weekLater.getDate() + 7)

  const dueSoon = applications.filter((application) => {
    if (!application.deadline) {
      return false
    }

    const deadline = new Date(application.deadline)
    return deadline >= now && deadline <= weekLater
  })

  if (dueSoon.length === 0) {
    return 'No application deadlines due in the next 7 days.'
  }

  return `You have ${dueSoon.length} ${dueSoon.length === 1 ? 'job' : 'jobs'} that need attention this week.`
}

function SummaryCard({ count, label }) {
  return (
    <article className="summary-card">
      <p className="card-number">{count}</p>
      <p className="card-label">{label}</p>
    </article>
  )
}

function ApplicationRow({ company, role, status, statusClass, date }) {
  return (
    <tr>
      <td>{company}</td>
      <td>{role}</td>
      <td>
        <span className={`status-badge ${statusClass}`}>{status}</span>
      </td>
      <td>{date}</td>
    </tr>
  )
}

function InsightCard({ title, value }) {
  return (
    <article className="dashboard-panel insight-card">
      <h3>{title}</h3>
      <p className="insight-value">{value}</p>
    </article>
  )
}

export default function DashboardPage({ user, authLoading, onSignIn }) {
  const [applications, setApplications] = useState([])
  const [profile, setProfile] = useState(null)
  const [isLoadingApplications, setIsLoadingApplications] = useState(Boolean(database) && Boolean(user))
  const [applicationsError, setApplicationsError] = useState(firebaseConfigError)
  const [profileError, setProfileError] = useState(firebaseConfigError)

  useEffect(() => {
    if (!database || !user) {
      setApplications([])
      setIsLoadingApplications(false)
      return undefined
    }

    setIsLoadingApplications(true)
    const applicationsRef = ref(database, `users/${user.uid}/applications`)
    const unsubscribeApplications = onValue(
      applicationsRef,
      (snapshot) => {
        setApplications(snapshotToApplications(snapshot.val()))
        setApplicationsError('')
        setIsLoadingApplications(false)
      },
      (error) => {
        setApplicationsError(error.message)
        setIsLoadingApplications(false)
      }
    )

    return unsubscribeApplications
  }, [user])

  useEffect(() => {
    if (!database || !user) {
      setProfile(null)
      return undefined
    }

    const profileRef = ref(database, `users/${user.uid}/profile`)
    const unsubscribeProfile = onValue(
      profileRef,
      (snapshot) => {
        setProfile(snapshot.exists() ? snapshot.val() : null)
        setProfileError('')
      },
      (error) => {
        setProfileError(error.message)
      }
    )

    return unsubscribeProfile
  }, [user])

  const summaryStats = useMemo(
    () => buildSummaryStats(applications),
    [applications]
  )
  const recentApplications = useMemo(
    () => buildRecentApplications(applications),
    [applications]
  )
  const insights = useMemo(
    () => buildInsights(applications),
    [applications]
  )
  const welcomeMessage = useMemo(
    () => buildWelcomeMessage(applications),
    [applications]
  )

  const summaryCards = summaryStats.map((stat) => (
    <SummaryCard key={stat.label} count={stat.count} label={stat.label} />
  ))

  const applicationRows = recentApplications.map((application) => (
    <ApplicationRow
      key={application.id}
      company={application.company}
      role={application.role}
      status={application.status}
      statusClass={application.statusClass}
      date={application.date}
    />
  ))

  const insightCards = insights.map((item) => (
    <InsightCard key={item.title} title={item.title} value={item.value} />
  ))

  if (authLoading) {
    return (
      <main className="container">
        <p className="feedback-message">Checking sign-in...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <SignInPrompt
        title="Sign in to view your dashboard"
        message="Your saved jobs, applications, and progress insights are personal to your account."
        onSignIn={onSignIn}
      />
    )
  }

  return (
    <main className="container">
      <section className="dashboard-content">
        <section className="welcome-section">
          <div>
            <h1>Welcome back{profile?.name ? `, ${profile.name}` : ''}!</h1>
            <p>{welcomeMessage}</p>
          </div>
          <Link className="btn btn-outline btn-welcome" to="/job-search">Browse Jobs</Link>
        </section>

        {!profile && (
          <section className="dashboard-panel profile-summary">
            <div>
              <h2>Saved Preferences</h2>
              <p>Add your preferences in onboarding to personalize the dashboard.</p>
            </div>
            <Link className="btn btn-light" to="/onboarding">
              Start Onboarding
            </Link>
          </section>
        )}

        {applicationsError && (
          <p className="feedback-message warning" role="alert">
            {applicationsError}
          </p>
        )}

        {profileError && (
          <p className="feedback-message warning" role="alert">
            {profileError}
          </p>
        )}

        {isLoadingApplications && (
          <p className="feedback-message">Loading dashboard...</p>
        )}

        <div className="summary-grid">
          {summaryCards}
        </div>

        <section className="dashboard-panel">
          <h2>Recent Applications</h2>
          {recentApplications.length === 0 ? (
            <p className="feedback-message">
              No applications yet. Visit{' '}
              <Link to="/applications">Applications</Link>
              {' '}to add one.
            </p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Company</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {applicationRows}
              </tbody>
            </table>
          )}
        </section>

        <div className="insights-grid">
          {insightCards}
        </div>
      </section>
    </main>
  )
}
