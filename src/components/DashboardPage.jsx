import { Link } from 'react-router'

export default function DashboardPage() {
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
          <article className="summary-card">
            <p className="card-number">48</p>
            <p className="card-label">Saved Jobs</p>
          </article>
          <article className="summary-card">
            <p className="card-number">23</p>
            <p className="card-label">Applied</p>
          </article>
          <article className="summary-card">
            <p className="card-number">7</p>
            <p className="card-label">Interviews</p>
          </article>
          <article className="summary-card">
            <p className="card-number">2</p>
            <p className="card-label">Offers</p>
          </article>
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
              <tr>
                <td>Google</td>
                <td>SWE Intern</td>
                <td><span className="status-badge interview">Interview</span></td>
                <td>Apr 10</td>
              </tr>
              <tr>
                <td>Stripe</td>
                <td>Frontend Engineer</td>
                <td><span className="status-badge applied">Applied</span></td>
                <td>Apr 8</td>
              </tr>
              <tr>
                <td>Airbnb</td>
                <td>UX Designer</td>
                <td><span className="status-badge saved">Saved</span></td>
                <td>Apr 5</td>
              </tr>
              <tr>
                <td>Meta</td>
                <td>Data Analyst</td>
                <td><span className="status-badge offer">Offer</span></td>
                <td>Apr 1</td>
              </tr>
              <tr>
                <td>Amazon</td>
                <td>SDE Intern</td>
                <td><span className="status-badge rejected">Rejected</span></td>
                <td>Mar 28</td>
              </tr>
            </tbody>
          </table>
        </section>

        <div className="insights-grid">
          <article className="dashboard-panel insight-card">
            <h3>Top City</h3>
            <p className="insight-value">Seattle</p>
          </article>
          <article className="dashboard-panel insight-card">
            <h3>Response Rate</h3>
            <p className="insight-value">48%</p>
          </article>
          <article className="dashboard-panel insight-card">
            <h3>Average Wait</h3>
            <p className="insight-value">12 days</p>
          </article>
          <article className="dashboard-panel insight-card">
            <h3>Next Deadline</h3>
            <p className="insight-value">Amazon · Apr 18</p>
          </article>
        </div>
      </section>
    </main>
  )
}
