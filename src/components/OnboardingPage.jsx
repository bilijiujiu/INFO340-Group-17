import { useState } from 'react'
import { ref, set } from 'firebase/database'
import { Link, useNavigate } from 'react-router'
import { database, firebaseConfigError } from '../firebase'

const initialProfile = {
  name: '',
  email: '',
  jobType: '',
  locations: '',
  salaryMin: '',
  salaryMax: '',
  experience: '',
  education: '',
  visa: '',
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(initialProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(firebaseConfigError)

  function handleChange(event) {
    const { name, value } = event.target
    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setError('')

    const profileToSave = {
      ...profile,
      updatedAt: new Date().toISOString(),
    }

    try {
      if (!database) {
        throw new Error(firebaseConfigError)
      }

      await set(ref(database, 'profiles/default'), profileToSave)
      navigate('/dashboard')
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="onboarding-wrapper">
      <header className="onboarding-header">
        <h1 className="brand-mark">JobTrack</h1>
        <p className="welcome-line">Welcome! Let&apos;s set up your job search.</p>
      </header>

      <main className="form-card">
        <h2 className="form-title">Tell us about yourself</h2>
        <p className="form-subtitle">
          We&apos;ll use this to personalize your job recommendations and analytics.
        </p>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          <fieldset className="form-section">
            <legend className="section-legend">Basic Info</legend>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Jane Doe"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="jane@uw.edu"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend className="section-legend">Job Preferences</legend>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="jobtype" className="form-label">Preferred Job Type</label>
                <select
                  id="jobtype"
                  name="jobType"
                  className="form-select"
                  value={profile.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Choose one...</option>
                  <option value="swe">Software Engineer</option>
                  <option value="pm">Product Manager</option>
                  <option value="designer">Designer (UX/UI)</option>
                  <option value="data">Data Analyst / Scientist</option>
                  <option value="research">Research</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="locations" className="form-label">Target Locations</label>
                <input
                  type="text"
                  id="locations"
                  name="locations"
                  className="form-control"
                  placeholder="e.g. Seattle, SF, NYC"
                  value={profile.locations}
                  onChange={handleChange}
                />
                <small className="form-help">Separate multiple cities with commas</small>
              </div>
            </div>

            <div className="row g-3 mt-1">
              <div className="col-6 col-md-3">
                <label htmlFor="salary-min" className="form-label">Min Salary (per hr)</label>
                <input
                  type="number"
                  id="salary-min"
                  name="salaryMin"
                  className="form-control"
                  placeholder="40"
                  min="0"
                  value={profile.salaryMin}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 col-md-3">
                <label htmlFor="salary-max" className="form-label">Max Salary (per hr)</label>
                <input
                  type="number"
                  id="salary-max"
                  name="salaryMax"
                  className="form-control"
                  placeholder="80"
                  min="0"
                  value={profile.salaryMax}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="experience" className="form-label">Experience Level</label>
                <select
                  id="experience"
                  name="experience"
                  className="form-select"
                  value={profile.experience}
                  onChange={handleChange}
                >
                  <option value="" disabled>Choose one...</option>
                  <option value="internship">Internship</option>
                  <option value="entry">Entry-level (0-2 yrs)</option>
                  <option value="mid">Mid-level (3-5 yrs)</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend className="section-legend">Background</legend>
            <p className="form-label">Education Level</p>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="education"
                  value="bachelor"
                  checked={profile.education === 'bachelor'}
                  onChange={handleChange}
                  required
                />
                <span>Bachelor&apos;s</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="education"
                  value="master"
                  checked={profile.education === 'master'}
                  onChange={handleChange}
                />
                <span>Master&apos;s</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="education"
                  value="phd"
                  checked={profile.education === 'phd'}
                  onChange={handleChange}
                />
                <span>PhD</span>
              </label>
            </div>

            <p className="form-label mt-3">Need Visa Sponsorship?</p>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="visa"
                  value="yes"
                  checked={profile.visa === 'yes'}
                  onChange={handleChange}
                  required
                />
                <span>Yes</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="visa"
                  value="no"
                  checked={profile.visa === 'no'}
                  onChange={handleChange}
                />
                <span>No</span>
              </label>
            </div>
          </fieldset>

          {error && <p className="form-error" role="alert">{error}</p>}
          {isSaving && <p className="feedback-message">Saving preferences...</p>}

          <div className="form-actions">
            <Link to="/applications" className="btn-skip">Skip for now</Link>
            <button type="submit" className="btn-submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Get Started →'}
            </button>
          </div>
        </form>
      </main>

      <footer className="onboarding-footer">
        <p>You can update these preferences anytime in Settings.</p>
      </footer>
    </div>
  )
}
