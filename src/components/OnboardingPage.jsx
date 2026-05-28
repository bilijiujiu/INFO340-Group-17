import { Link, useNavigate } from 'react-router'

export default function OnboardingPage() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/applications')
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
                <input type="text" id="name" name="name" className="form-control" placeholder="Jane Doe" required />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="jane@uw.edu" required />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend className="section-legend">Job Preferences</legend>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="jobtype" className="form-label">Preferred Job Type</label>
                <select id="jobtype" name="jobtype" className="form-select" required defaultValue="">
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
                <input type="text" id="locations" name="locations" className="form-control" placeholder="e.g. Seattle, SF, NYC" />
                <small className="form-help">Separate multiple cities with commas</small>
              </div>
            </div>

            <div className="row g-3 mt-1">
              <div className="col-6 col-md-3">
                <label htmlFor="salary-min" className="form-label">Min Salary (per hr)</label>
                <input type="number" id="salary-min" name="salary-min" className="form-control" placeholder="40" min="0" />
              </div>
              <div className="col-6 col-md-3">
                <label htmlFor="salary-max" className="form-label">Max Salary (per hr)</label>
                <input type="number" id="salary-max" name="salary-max" className="form-control" placeholder="80" min="0" />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="experience" className="form-label">Experience Level</label>
                <select id="experience" name="experience" className="form-select" defaultValue="">
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
                <input type="radio" name="education" value="bachelor" required />
                <span>Bachelor&apos;s</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="education" value="master" />
                <span>Master&apos;s</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="education" value="phd" />
                <span>PhD</span>
              </label>
            </div>

            <p className="form-label mt-3">Need Visa Sponsorship?</p>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="visa" value="yes" required />
                <span>Yes</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="visa" value="no" />
                <span>No</span>
              </label>
            </div>
          </fieldset>

          <div className="form-actions">
            <Link to="/applications" className="btn-skip">Skip for now</Link>
            <button type="submit" className="btn-submit">Get Started →</button>
          </div>
        </form>
      </main>

      <footer className="onboarding-footer">
        <p>You can update these preferences anytime in Settings.</p>
      </footer>
    </div>
  )
}
