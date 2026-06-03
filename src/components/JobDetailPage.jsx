import { useEffect, useState } from 'react'
import { onValue, ref, update } from 'firebase/database'
import { Link, useParams } from 'react-router'
import { statusOptions } from '../data/applications'
import { database, firebaseConfigError } from '../firebase'
import { getJobById } from '../data/jobs'

const defaultWorkspace = {
  status: 'Interview',
  notes: '',
  tasks: [
    { id: 'task-thank-you', label: 'Send thank-you email after phone screen', done: false },
    { id: 'task-coding', label: 'Complete online coding challenge', done: false },
    { id: 'task-mock', label: 'Finish mock interview prep', done: true },
    { id: 'task-research', label: 'Research team projects before onsite', done: false },
  ],
}

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

function StatusPills({ current, isSaving, onChange }) {
  const statusButtons = statusOptions.map((status) => (
    <button
      key={status}
      type="button"
      className={`status-pill ${status === current ? 'active' : ''}`}
      aria-pressed={status === current}
      disabled={isSaving}
      onClick={() => onChange(status)}
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

function TaskList({ tasks, isSaving, onToggle }) {
  const taskItems = tasks.map((task) => (
    <li key={task.id}>
      <label htmlFor={`task-${task.id}`}>
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.done}
          disabled={isSaving}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.done ? 'task-complete' : undefined}>
          {task.label}
        </span>
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
  const [workspace, setWorkspace] = useState(defaultWorkspace)
  const [isLoading, setIsLoading] = useState(Boolean(database))
  const [error, setError] = useState(firebaseConfigError)
  const [notesDraft, setNotesDraft] = useState('')
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [newTaskLabel, setNewTaskLabel] = useState('')
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!database) {
      return undefined
    }

    const workspaceRef = ref(database, `jobWorkspaces/${id}`)
    const unsubscribe = onValue(
      workspaceRef,
      (snapshot) => {
        setWorkspace(snapshot.exists() ? snapshot.val() : defaultWorkspace)
        setError('')
        setIsLoading(false)
      },
      (readError) => {
        setError(readError.message)
        setIsLoading(false)
      }
    )

    return unsubscribe
  }, [id])

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

  const tasks = workspace.tasks || []
  const notesValue = isEditingNotes ? notesDraft : workspace.notes || ''

  async function saveWorkspaceChange(changes) {
    setIsSaving(true)
    setError('')
    setFormError('')

    try {
      const changesToSave = {
        ...changes,
        updatedAt: new Date().toISOString(),
      }

      if (database) {
        await update(ref(database, `jobWorkspaces/${id}`), changesToSave)
      } else {
        setWorkspace((currentWorkspace) => ({
          ...currentWorkspace,
          ...changesToSave,
        }))
        setError(firebaseConfigError)
      }
    } catch (saveError) {
      setFormError(saveError.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleStatusChange(status) {
    await saveWorkspaceChange({ status })
  }

  async function handleNotesSubmit(event) {
    event.preventDefault()
    await saveWorkspaceChange({ notes: notesValue.trim() })
    setIsEditingNotes(false)
  }

  async function handleTaskToggle(taskId) {
    const updatedTasks = tasks.map((task) => (
      task.id === taskId ? { ...task, done: !task.done } : task
    ))

    await saveWorkspaceChange({ tasks: updatedTasks })
  }

  async function handleTaskSubmit(event) {
    event.preventDefault()
    const taskLabel = newTaskLabel.trim()

    if (!taskLabel) {
      setFormError('Task text is required.')
      return
    }

    const updatedTasks = [
      ...tasks,
      {
        id: `task-${Date.now()}`,
        label: taskLabel,
        done: false,
      },
    ]

    await saveWorkspaceChange({ tasks: updatedTasks })
    setNewTaskLabel('')
  }

  const descriptionParagraphs = job.description.map((para, i) => (
    <p key={i}>{para}</p>
  ))

  return (
    <main className="container">
      <div className="detail-layout">
        <section className="detail-panel">
          <p className="detail-company">{job.company}</p>
          <h1 className="detail-role">{job.title}</h1>

          <JobMeta job={job} />

          <div className="detail-description">
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

        <section className="detail-panel">
          <h2 className="workspace-title">Workspace</h2>

          {error && <p className="feedback-message warning" role="alert">{error}</p>}
          {formError && <p className="form-error" role="alert">{formError}</p>}
          {isLoading && <p className="feedback-message">Loading workspace...</p>}
          {isSaving && <p className="feedback-message">Saving workspace...</p>}

          <h3 className="subsection-title">Status</h3>
          <StatusPills
            current={workspace.status}
            isSaving={isSaving}
            onChange={handleStatusChange}
          />

          <h3 className="subsection-title">Notes</h3>
          <form onSubmit={handleNotesSubmit}>
            <label htmlFor="workspace-notes" className="sr-only">
              Your notes for this job
            </label>
            <textarea
              id="workspace-notes"
              className="notes-area"
              value={notesValue}
              onChange={(event) => {
                setIsEditingNotes(true)
                setNotesDraft(event.target.value)
              }}
              placeholder="Write your notes here... (e.g., recruiter name, interview format, prep reminders)"
            />
            <div className="save-row">
              <button type="submit" className="btn btn-light" disabled={isSaving}>
                Save Note
              </button>
            </div>
          </form>

          <h3 className="subsection-title">Tasks</h3>
          <TaskList tasks={tasks} isSaving={isSaving} onToggle={handleTaskToggle} />

          <form className="task-form" onSubmit={handleTaskSubmit}>
            <label htmlFor="new-task" className="sr-only">New task</label>
            <input
              id="new-task"
              type="text"
              value={newTaskLabel}
              onChange={(event) => setNewTaskLabel(event.target.value)}
              placeholder="Add a follow-up task"
            />
            <button type="submit" className="btn btn-outline btn-add-task-sm" disabled={isSaving}>
              Add Task
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
