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
        <button type="button" className="btn-save">View Details</button>
      </div>
    </article>
  )
}
