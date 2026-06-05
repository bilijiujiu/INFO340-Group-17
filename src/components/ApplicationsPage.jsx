import { useEffect, useState } from 'react'
import { onValue, push, ref, update } from 'firebase/database'
import { statusOptions } from '../data/applications'
import { database, firebaseConfigError } from '../firebase'

const initialFormValues = {
  company: '',
  role: '',
  location: '',
  deadline: '',
  status: 'Saved',
  source: '',
}

function ApplicationForm({ formValues, error, isSaving, onChange, onCancel, onSubmit }) {
  const statusOptionsElements = statusOptions.map((status) => (
    <option key={status} value={status}>{status}</option>
  ))

  return (
    <form className="application-form" onSubmit={onSubmit}>
      <div className="form-grid compact-form-grid">
        <div className="filter-group">
          <label htmlFor="application-company">Company</label>
          <input
            id="application-company"
            name="company"
            type="text"
            value={formValues.company}
            onChange={onChange}
            placeholder="e.g. Microsoft"
            required
          />
        </div>

        <div className="filter-group">
          <label htmlFor="application-role">Role</label>
          <input
            id="application-role"
            name="role"
            type="text"
            value={formValues.role}
            onChange={onChange}
            placeholder="e.g. Product Design Intern"
            required
          />
        </div>

        <div className="filter-group">
          <label htmlFor="application-location">Location</label>
          <input
            id="application-location"
            name="location"
            type="text"
            value={formValues.location}
            onChange={onChange}
            placeholder="Seattle, WA"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="application-deadline">Deadline</label>
          <input
            id="application-deadline"
            name="deadline"
            type="date"
            value={formValues.deadline}
            onChange={onChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="application-status">Status</label>
          <select
            id="application-status"
            name="status"
            value={formValues.status}
            onChange={onChange}
          >
            {statusOptionsElements}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="application-source">Source</label>
          <input
            id="application-source"
            name="source"
            type="text"
            value={formValues.source}
            onChange={onChange}
            placeholder="LinkedIn, referral, Handshake"
          />
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="form-actions inline-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Application'}
        </button>
      </div>
    </form>
  )
}

function ApplicationCard({ application, onStatusChange }) {
  const statusSelectId = `status-${application.id}`
  const statusOptionsElements = statusOptions.map((status) => (
    <option key={status} value={status}>{status}</option>
  ))

  return (
    <article className="job-card application-card">
      <h3 className="job-company">{application.company}</h3>
      <p className="job-role">{application.role}</p>
      <dl className="application-meta">
        {application.location && (
          <div>
            <dt>Location</dt>
            <dd>{application.location}</dd>
          </div>
        )}
        {application.deadline && (
          <div>
            <dt>Deadline</dt>
            <dd>{application.deadline}</dd>
          </div>
        )}
        {application.source && (
          <div>
            <dt>Source</dt>
            <dd>{application.source}</dd>
          </div>
        )}
      </dl>
      <label className="status-select-label" htmlFor={statusSelectId}>
        Move to
      </label>
      <select
        id={statusSelectId}
        className="status-select"
        value={application.status}
        onChange={(event) => onStatusChange(application.id, event.target.value)}
      >
        {statusOptionsElements}
      </select>
    </article>
  )
}

function KanbanColumn({ status, applications, onStatusChange }) {
  const cards = applications.map((application) => (
    <ApplicationCard
      key={application.id}
      application={application}
      onStatusChange={onStatusChange}
    />
  ))

  return (
    <article className="column">
      <header className="column-header">
        <span>{status}</span>
        <span className="column-count">{applications.length}</span>
      </header>
      {applications.length === 0 ? (
        <p className="column-empty">No applications here yet.</p>
      ) : (
        cards
      )}
    </article>
  )
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

function createLocalId() {
  return `local-${Date.now()}`
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(database))
  const [firebaseError, setFirebaseError] = useState(firebaseConfigError)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [activeSaveId, setActiveSaveId] = useState('')

  useEffect(() => {
    if (!database) {
      return undefined
    }

    const applicationsRef = ref(database, 'applications')
    const unsubscribe = onValue(
      applicationsRef,
      (snapshot) => {
        setApplications(snapshotToApplications(snapshot.val()))
        setFirebaseError('')
        setIsLoading(false)
      },
      (error) => {
        setFirebaseError(error.message)
        setIsLoading(false)
      }
    )

    return unsubscribe
  }, [])

  function handleFormChange(event) {
    const { name, value } = event.target
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  function closeForm() {
    setIsFormOpen(false)
    setFormValues(initialFormValues)
    setFormError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const company = formValues.company.trim()
    const role = formValues.role.trim()

    if (!company || !role) {
      setFormError('Company and role are required.')
      return
    }

    setIsSaving(true)
    setFormError('')

    try {
      const newApplication = {
        company,
        role,
        location: formValues.location.trim(),
        deadline: formValues.deadline,
        status: formValues.status,
        source: formValues.source.trim(),
        createdAt: new Date().toISOString(),
      }

      if (database) {
        await push(ref(database, 'applications'), newApplication)
      } else {
        setApplications((currentApplications) => [
          { id: createLocalId(), ...newApplication },
          ...currentApplications,
        ])
        setFirebaseError(firebaseConfigError)
      }

      closeForm()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleStatusChange(id, status) {
    setActiveSaveId(id)
    setFirebaseError('')

    try {
      if (database) {
        await update(ref(database, `applications/${id}`), {
          status,
          updatedAt: new Date().toISOString(),
        })
      } else {
        setApplications((currentApplications) =>
          currentApplications.map((application) => (
            application.id === id ? { ...application, status } : application
          ))
        )
        setFirebaseError(firebaseConfigError)
      }
    } catch (error) {
      setFirebaseError(error.message)
    } finally {
      setActiveSaveId('')
    }
  }

  const columns = statusOptions.map((status) => {
    const statusApplications = applications.filter((application) => (
      application.status === status
    ))

    return (
      <KanbanColumn
        key={status}
        status={status}
        applications={statusApplications}
        onStatusChange={handleStatusChange}
      />
    )
  })

  return (
    <div className="page-wrapper">
      <main className="main-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">My Applications</h1>
            <p className="page-subtitle">
              Add roles, update their status, and keep the board synced across sessions.
            </p>
          </div>
          <button
            type="button"
            className="btn-add-job"
            onClick={() => setIsFormOpen((open) => !open)}
          >
            {isFormOpen ? 'Close Form' : '+ Add Job'}
          </button>
        </header>

        {firebaseError && (
          <p className="feedback-message warning" role="alert">
            {firebaseError}
          </p>
        )}

        {isLoading && <p className="feedback-message">Loading applications...</p>}
        {activeSaveId && <p className="feedback-message">Saving board update...</p>}

        {isFormOpen && (
          <ApplicationForm
            formValues={formValues}
            error={formError}
            isSaving={isSaving}
            onChange={handleFormChange}
            onCancel={closeForm}
            onSubmit={handleSubmit}
          />
        )}

        {!isLoading && applications.length === 0 && (
          <div className="empty-state">
            <p>No applications yet. Click + Add Job to track your first role.</p>
          </div>
        )}

        <section className="kanban" aria-label="Application status board">
          {columns}
        </section>
      </main>
    </div>
  )
}
