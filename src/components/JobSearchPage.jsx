import { useMemo, useState } from 'react'
import JobCard from './JobCard'

const jobs = [
  {
    id: 'google-pm',
    title: 'Product Manager',
    badge: 'Full-time',
    badgeClass: 'badge-fulltime',
    company: 'Google',
    location: 'Seattle, WA · Remote',
    salary: '$45 / hr',
    salaryNum: 45,
    sponsor: 'H-1B',
  },
  {
    id: 'amazon-swe',
    title: 'Software Engineer',
    badge: 'Full-time',
    badgeClass: 'badge-fulltime',
    company: 'Amazon',
    location: 'Seattle, WA',
    salary: '$55 / hr',
    salaryNum: 55,
    sponsor: 'CPT / OPT',
  },
  {
    id: 'uw-ta',
    title: 'Teaching Assistant',
    badge: 'Part-time',
    badgeClass: 'badge-parttime',
    company: 'University of Washington',
    location: 'Seattle, WA',
    salary: '$21 / hr',
    salaryNum: 21,
    sponsor: 'No Sponsorship',
  },
  {
    id: 'stripe-fe',
    title: 'Frontend Engineer Intern',
    badge: 'Internship',
    badgeClass: 'badge-internship',
    company: 'Stripe',
    location: 'San Francisco, CA',
    salary: '$38 / hr',
    salaryNum: 38,
    sponsor: 'CPT / OPT',
  },
  {
    id: 'meta-data',
    title: 'Data Analyst',
    badge: 'Full-time',
    badgeClass: 'badge-fulltime',
    company: 'Meta',
    location: 'Remote',
    salary: '$50 / hr',
    salaryNum: 50,
    sponsor: 'H-1B',
  },
  {
    id: 'airbnb-ux',
    title: 'UX Designer Intern',
    badge: 'Internship',
    badgeClass: 'badge-internship',
    company: 'Airbnb',
    location: 'San Francisco, CA · Remote',
    salary: '$28 / hr',
    salaryNum: 28,
    sponsor: 'CPT / OPT',
  },
]

const locationMatchers = {
  seattle: (loc) => /seattle/i.test(loc),
  sf: (loc) => /san francisco|sf,/i.test(loc),
  nyc: (loc) => /new york|nyc/i.test(loc),
  remote: (loc) => /remote/i.test(loc),
}

const experienceMap = {
  internship: 'Internship',
  'part-time': 'Part-time',
  'full-time': 'Full-time',
}

const sponsorMap = {
  'cpt-opt': 'CPT / OPT',
  h1b: 'H-1B',
  none: 'No Sponsorship',
}

const salaryRanges = {
  '0-20': [0, 20],
  '20-30': [20, 30],
  '30-50': [30, 50],
  '50+': [50, Infinity],
}

const initialFilters = {
  query: '',
  location: '',
  salary: '',
  experience: '',
  sponsorship: '',
  sortBy: 'relevance',
}

export default function JobSearchPage() {
  const [filters, setFilters] = useState(initialFilters)

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function clearFilters() {
    setFilters(initialFilters)
  }

  const filteredJobs = useMemo(() => {
    const q = filters.query.trim().toLowerCase()

    const result = jobs.filter((job) => {
      if (q && !`${job.title} ${job.company}`.toLowerCase().includes(q)) {
        return false
      }
      if (filters.location && !locationMatchers[filters.location]?.(job.location)) {
        return false
      }
      if (filters.experience && experienceMap[filters.experience] !== job.badge) {
        return false
      }
      if (filters.sponsorship && sponsorMap[filters.sponsorship] !== job.sponsor) {
        return false
      }
      if (filters.salary) {
        const [min, max] = salaryRanges[filters.salary]
        if (job.salaryNum < min || job.salaryNum >= max) {
          return false
        }
      }
      return true
    })

    switch (filters.sortBy) {
      case 'salary-high':
        return [...result].sort((a, b) => b.salaryNum - a.salaryNum)
      case 'salary-low':
        return [...result].sort((a, b) => a.salaryNum - b.salaryNum)
      case 'title-az':
        return [...result].sort((a, b) => a.title.localeCompare(b.title))
      default:
        return result
    }
  }, [filters])

  const hasActiveFilter =
    filters.query !== '' ||
    filters.location !== '' ||
    filters.salary !== '' ||
    filters.experience !== '' ||
    filters.sponsorship !== '' ||
    filters.sortBy !== 'relevance'

  return (
    <main className="container">
      <div className="search-layout">
        <aside className="filter-panel" aria-label="Job filters">
          <div className="filter-panel-header">
            <h2>Filters</h2>
            {hasActiveFilter && (
              <button type="button" className="link-button" onClick={clearFilters}>
                Clear all
              </button>
            )}
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="filter-group">
              <label htmlFor="filter-location">Location</label>
              <select
                id="filter-location"
                name="location"
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="seattle">Seattle, WA</option>
                <option value="sf">San Francisco, CA</option>
                <option value="nyc">New York, NY</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filter-salary">Salary Range</label>
              <select
                id="filter-salary"
                name="salary"
                value={filters.salary}
                onChange={(e) => updateFilter('salary', e.target.value)}
              >
                <option value="">Any Salary</option>
                <option value="0-20">$0 – $20 / hr</option>
                <option value="20-30">$20 – $30 / hr</option>
                <option value="30-50">$30 – $50 / hr</option>
                <option value="50+">$50+ / hr</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filter-experience">Experience Level</label>
              <select
                id="filter-experience"
                name="experience"
                value={filters.experience}
                onChange={(e) => updateFilter('experience', e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filter-sponsor">Visa Sponsorship</label>
              <select
                id="filter-sponsor"
                name="sponsorship"
                value={filters.sponsorship}
                onChange={(e) => updateFilter('sponsorship', e.target.value)}
              >
                <option value="">All</option>
                <option value="cpt-opt">CPT / OPT</option>
                <option value="h1b">H-1B</option>
                <option value="none">No Sponsorship</option>
              </select>
            </div>
          </form>
        </aside>

        <section className="search-main" aria-label="Job listings">
          <div className="search-bar" role="search">
            <label htmlFor="job-search-input" className="sr-only">Search jobs</label>
            <input
              type="text"
              id="job-search-input"
              placeholder="Search by title, company, or keyword..."
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
            />
          </div>

          <div className="results-header">
            <h1>Job Listings</h1>
            <div className="results-controls">
              <span className="results-count">
                Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'result' : 'results'}
              </span>
              <label htmlFor="sort-by" className="sort-label">Sort by</label>
              <select
                id="sort-by"
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
                <option value="title-az">Title: A–Z</option>
              </select>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="empty-state">
              <p>No jobs match your filters.</p>
              <button type="button" className="btn btn-outline" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="job-grid">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
