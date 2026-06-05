import { Link } from 'react-router'
import { imageCredits } from '../data/imageCredits'

function HeroCta({ user, authLoading, onSignIn }) {
  if (authLoading) {
    return <span className="hero-status">Checking sign-in...</span>
  }

  if (user) {
    return (
      <Link className="btn btn-primary" to="/dashboard">
        Open Dashboard
      </Link>
    )
  }

  return (
    <button type="button" className="btn btn-primary" onClick={onSignIn}>
      Get Started with Google
    </button>
  )
}

export default function LandingPage({ user, authLoading, onSignIn }) {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">Your Job Search, Organized and Visualized</p>
          <h1>Track applications, stay on schedule, and understand your progress.</h1>
          <p className="hero-description">
            JobTrack helps college students manage saved jobs, applications, notes,
            deadlines, and follow-up tasks without switching between platforms.
          </p>
          <div className="hero-buttons">
            <HeroCta user={user} authLoading={authLoading} onSignIn={onSignIn} />
            <a className="btn btn-outline" href="#features">View Features</a>
          </div>
          <figure className="hero-image">
            <img
              src="/img/hero-job-search.jpg"
              alt="Student searching for jobs on a laptop, representing the job tracking experience"
            />
            <figcaption className="image-credit">
              {imageCredits['/img/hero-job-search.jpg']}
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <h2>Key Features</h2>
          <div className="feature-grid">
            <article className="feature-card">
              <h3>Dashboard Overview</h3>
              <p>See your saved jobs, submitted applications, interviews, offers, and recent activity all in one place.</p>
            </article>
            <article className="feature-card">
              <h3>Job Search &amp; Filters</h3>
              <p>Search jobs and narrow results by location, salary, experience level, and visa sponsorship needs.</p>
            </article>
            <article className="feature-card">
              <h3>Application Tracker</h3>
              <p>Move jobs through stages like saved, applied, interview, offer, and rejected using a Kanban board.</p>
            </article>
            <article className="feature-card">
              <h3>Workspace &amp; Notes</h3>
              <p>Store deadlines, interview details, personal notes, and next-step tasks for each job you track.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="steps-section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <article className="step-card">
              <div className="step-number" aria-hidden="true">1</div>
              <h3>Search &amp; Save</h3>
              <p>Find job opportunities that match your goals and save them to your board.</p>
            </article>
            <article className="step-card">
              <div className="step-number" aria-hidden="true">2</div>
              <h3>Track Progress</h3>
              <p>Update each job as you apply, interview, or receive a decision.</p>
            </article>
            <article className="step-card">
              <div className="step-number" aria-hidden="true">3</div>
              <h3>Review Insights</h3>
              <p>Use summary analytics to understand where your job search is heading.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2>Why JobTrack?</h2>
          <p className="about-text">
            Job hunting information is often scattered across LinkedIn, Handshake, email,
            calendars, and personal notes. JobTrack brings those pieces together so students
            can feel more organized and in control of their career search.
          </p>
          <figure className="about-image">
            <img
              src="/img/team-collaboration.jpg"
              alt="Team collaborating on organizing job applications together"
            />
            <figcaption className="image-credit">
              {imageCredits['/img/team-collaboration.jpg']}
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  )
}
