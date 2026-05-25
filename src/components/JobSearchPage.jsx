const jobs = [
  {
    title: 'Product Manager',
    badge: 'Full-time',
    badgeClass: 'badge-fulltime',
    company: 'Google',
    location: 'Seattle, WA · Remote',
    salary: '$45 / hr',
    sponsor: 'H-1B',
  },
  {
    title: 'Software Engineer',
    badge: 'Full-time',
    badgeClass: 'badge-fulltime',
    company: 'Amazon',
    location: 'Seattle, WA',
    salary: '$55 / hr',
    sponsor: 'CPT / OPT',
  },
  {
    title: 'Teaching Assistant',
    badge: 'Part-time',
    badgeClass: 'badge-parttime',
    company: 'University of Washington',
    location: 'Seattle, WA',
    salary: '$21 / hr',
    sponsor: 'No Sponsorship',
  },
  {
    title: 'Frontend Engineer Intern',
    badge: 'Internship',
    badgeClass: 'badge-internship',
    company: 'Stripe',
    location: 'San Francisco, CA',
    salary: '$38 / hr',
    sponsor: 'CPT / OPT',
  },
  {
    title: 'Data Analyst',
    badge: 'Full-time',
    badgeClass: 'badge-fulltime',
    company: 'Meta',
    location: 'Remote',
    salary: '$50 / hr',
    sponsor: 'H-1B',
  },
  {
    title: 'UX Designer Intern',
    badge: 'Internship',
    badgeClass: 'badge-internship',
    company: 'Airbnb',
    location: 'San Francisco, CA · Remote',
    salary: '$28 / hr',
    sponsor: 'CPT / OPT',
  },
]

export default function JobSearchPage() {
  return (
    <main className="container">
      <div className="search-layout">
        <aside className="filter-panel" aria-label="Job filters">
          <h2>Filters</h2>
          <form>
            <div className="filter-group">
              <label htmlFor="filter-location">Location</label>
              <select id="filter-location" name="location">
                <option value="">All Locations</option>
                <option value="seattle">Seattle, WA</option>
                <option value="sf">San Francisco, CA</option>
                <option value="nyc">New York, NY</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filter-salary">Salary Range</label>
              <select id="filter-salary" name="salary">
                <option value="">Any Salary</option>
                <option value="0-20">$0 – $20 / hr</option>
                <option value="20-30">$20 – $30 / hr</option>
                <option value="30-50">$30 – $50 / hr</option>
                <option value="50+">$50+ / hr</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filter-experience">Experience Level</label>
              <select id="filter-experience" name="experience">
                <option value="">All Levels</option>
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filter-sponsor">Visa Sponsorship</label>
              <select id="filter-sponsor" name="sponsorship">
                <option value="">All</option>
                <option value="cpt-opt">CPT / OPT</option>
                <option value="h1b">H-1B</option>
                <option value="none">No Sponsorship</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-filter-full">Apply Filters</button>
          </form>
        </aside>

        <section className="search-main" aria-label="Job listings">
          <div className="search-bar" role="search">
            <label htmlFor="job-search-input" className="sr-only">Search jobs</label>
            <input type="text" id="job-search-input" placeholder="Search by title, company, or keyword..." />
            <button type="button" className="btn btn-primary">Search</button>
          </div>

          <div className="results-header">
            <h1>Job Listings</h1>
            <span className="results-count">Showing 6 results</span>
          </div>

          <div className="job-grid">
            {jobs.map((job) => (
              <article key={job.title + job.company} className="job-card">
                <div className="job-card-top">
                  <h2>{job.title}</h2>
                  <span className={`badge ${job.badgeClass}`}>{job.badge}</span>
                </div>
                <div className="job-card-meta">
                  <span>{job.company}</span>
                  <span>{job.location}</span>
                  <span>{job.salary}</span>
                </div>
                <div className="job-card-footer">
                  <span className="sponsor-tag">{job.sponsor}</span>
                  <button type="button" className="btn-save">View Details</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
