import { Link, useParams } from 'react-router'
import { getJobById } from '../data/jobs'

const statusOptions = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected']

const defaultTasks = [
  { id: 1, label: 'Send thank-you email after phone screen', done: false },
  { id: 2, label: 'Complete online coding challenge', done: false },
  { id: 3, label: 'Finish mock interview prep', done: true },
  { id: 4, label: 'Research team projects before onsite', done: false },
]

const defaultStatus = 'Interview'

function JobMeta({ job }) {
  const items = [
    { label: 'Salary', value: job.salary },
    { label: 'Location', value: job.location },
    { label: 'Deadline', value: job.deadline },
    { label: 'Source', value: job.source },
    { label: 'Type', value: job.type },
  ]
  const metaItems = items.map(({ label, value }) => (
    <li key={label}>
      <strong>{label}:</strong> {value}
    </li>
  ))

  return (
    <ul className="detail-meta">
      {metaItems}
    </ul>
  )
}

function StatusPills({ current }) {
  const statusButtons = statusOptions.map((status) => (
    <button
      key={status}
      type="button"
      className={`status-pill ${status === current ? 'active' : ''}`}
    >
      {status}
    </button>
  ))

  return (
    <div className="status-group">
      {statusButtons}
    </div>
  )
}

function TaskList({ tasks }) {
  const taskItems = tasks.map((task) => (
    <li key={task.id}>
      <label htmlFor={`task-${task.id}`}>
        <input
          type="checkbox"
          id={`task-${task.id}`}
          defaultChecked={task.done}
        />
        {' '}{task.label}
      </label>
    </li>
  ))

  return (
    <ul className="task-list">
      {taskItems}
    </ul>
  )
}

export default function JobDetailPage() {
  const { id } = useParams()
  const job = getJobById(id)

  if (!job) {
    return (
      <main className="container">
        <div className="empty-state">
          <p>Job not found.</p>
          <Link to="/job-search" className="btn btn-outline">
            Back to Job Search
          </Link>
        </div>
      </main>
    )
  }

  const descriptionParagraphs = job.description.map((para, i) => (
    <p key={i}>{para}</p>
  ))

  return (
    <main className="container">
      <div className="detail-layout">
        <section className="detail-panel" aria-label="Job details">
          <p className="detail-company">{job.company}</p>
          <h1 className="detail-role">{job.title}</h1>

          <JobMeta job={job} />

          <div className="detail-description" aria-label="Job description">
            {descriptionParagraphs}
          </div>

          {job.image && (
            <div className="hero-image detail-image">
              <img src={job.image} alt={job.imageAlt || ''} />
            </div>
          )}

          <Link to="/job-search" className="btn btn-outline">
            Back to Job Search
          </Link>
        </section>

        <section className="detail-panel" aria-label="Application workspace">
          <h2 className="workspace-title">Workspace</h2>

          <h3 className="subsection-title">Status</h3>
          <StatusPills current={defaultStatus} />

          <h3 className="subsection-title">Notes</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="workspace-notes" className="sr-only">
              Your notes for this job
            </label>
            <textarea
              id="workspace-notes"
              className="notes-area"
              placeholder="Write your notes here... (e.g., recruiter name, interview format, prep reminders)"
            />
            <div className="save-row">
              <button type="button" className="btn btn-light">
                Save Note
              </button>
            </div>
          </form>

          <h3 className="subsection-title">Tasks</h3>
          <TaskList tasks={defaultTasks} />
          <button type="button" className="btn btn-outline btn-add-task-sm">
            + Add Task
          </button>
        </section>
      </div>
    </main>
  )
}
