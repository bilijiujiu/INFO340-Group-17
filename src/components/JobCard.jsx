import { Link } from 'react-router'

export default function JobCard({ job, isPreferenceMatch = false }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <h2>{job.title}</h2>
        <div className="job-card-badges">
          {isPreferenceMatch && (
            <span className="badge badge-match">Matches your preferences</span>
          )}
          <span className={`badge ${job.badgeClass}`}>{job.badge}</span>
        </div>
      </div>
      <div className="job-card-meta">
        <span>{job.company}</span>
        <span>{job.location}</span>
        <span>{job.salary}</span>
      </div>
      <div className="job-card-footer">
        <span className="sponsor-tag">{job.sponsor}</span>
        <Link
          to={`/job/${job.id}`}
          className="btn-save"
          aria-label={`View details for ${job.title} at ${job.company}`}
        >
          View Details
        </Link>
      </div>
    </article>
  )
}
