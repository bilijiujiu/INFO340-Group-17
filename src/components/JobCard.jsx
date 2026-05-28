import { Link } from 'react-router'

export default function JobCard({ job }) {
  return (
    <article className="job-card">
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
        <Link to={`/job/${job.id}`} className="btn-save">
          View Details
        </Link>
      </div>
    </article>
  )
}
