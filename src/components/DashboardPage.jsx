import { Link } from 'react-router'

const summaryStats = [
  { count: '48', label: 'Saved Jobs' },
  { count: '23', label: 'Applied' },
  { count: '7', label: 'Interviews' },
  { count: '2', label: 'Offers' },
]

const recentApplications = [
  { company: 'Google', role: 'SWE Intern', status: 'Interview', statusClass: 'interview', date: 'Apr 10' },
  { company: 'Stripe', role: 'Frontend Engineer', status: 'Applied', statusClass: 'applied', date: 'Apr 8' },
  { company: 'Airbnb', role: 'UX Designer', status: 'Saved', statusClass: 'saved', date: 'Apr 5' },
  { company: 'Meta', role: 'Data Analyst', status: 'Offer', statusClass: 'offer', date: 'Apr 1' },
  { company: 'Amazon', role: 'SDE Intern', status: 'Rejected', statusClass: 'rejected', date: 'Mar 28' },
]

const insights = [
  { title: 'Top City', value: 'Seattle' },
  { title: 'Response Rate', value: '48%' },
  { title: 'Average Wait', value: '12 days' },
  { title: 'Next Deadline', value: 'Amazon · Apr 18' },
]

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

export default function DashboardPage() {
  const summaryCards = summaryStats.map((stat) => (
    <SummaryCard key={stat.label} count={stat.count} label={stat.label} />
  ))

  const applicationRows = recentApplications.map((application) => (
    <ApplicationRow
      key={application.company}
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

  return (
    <main className="container">
      <section className="dashboard-content">
        <section className="welcome-section">
          <div>
            <h1>Welcome back!</h1>
            <p>You have 3 jobs that need attention this week.</p>
          </div>
          <Link className="btn btn-outline btn-welcome" to="/job-search">Browse Jobs</Link>
        </section>

        <div className="summary-grid">
          {summaryCards}
        </div>

        <section className="dashboard-panel">
          <h2>Recent Applications</h2>
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
        </section>

        <div className="insights-grid">
          {insightCards}
        </div>
      </section>
    </main>
  )
}
