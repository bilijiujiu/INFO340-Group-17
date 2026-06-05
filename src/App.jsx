import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import Navbar, { SiteFooter } from './components/Navbar'
import LandingPage from './components/LandingPage'
import DashboardPage from './components/DashboardPage'
import JobSearchPage from './components/JobSearchPage'
import ApplicationsPage from './components/ApplicationsPage'
import AnalyticsPage from './components/AnalyticsPage'
import OnboardingPage from './components/OnboardingPage'
import JobDetailPage from './components/JobDetailPage'
import NotFoundPage from './components/NotFoundPage'
import { auth, googleProvider } from './firebase'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/job-search', label: 'Job Search' },
  { to: '/applications', label: 'Applications' },
  { to: '/analytics', label: 'Analytics' },
]

function AppLayout({ user, authLoading, authError, onSignIn, onSignOut }) {
  const { pathname } = useLocation()
  const showNav = pathname !== '/onboarding'

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {showNav && (
        <Navbar
          links={navLinks}
          user={user}
          authLoading={authLoading}
          onSignIn={onSignIn}
          onSignOut={onSignOut}
        />
      )}
      <div id="main-content" className="site-main" tabIndex={-1}>
        {authError && (
          <p className="feedback-message warning auth-banner" role="alert">
            {authError}
          </p>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage user={user} authLoading={authLoading} onSignIn={onSignIn} />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardPage user={user} authLoading={authLoading} onSignIn={onSignIn} />
            }
          />
          <Route
            path="/job-search"
            element={<JobSearchPage user={user} />}
          />
          <Route
            path="/job/:id"
            element={
              <JobDetailPage user={user} authLoading={authLoading} onSignIn={onSignIn} />
            }
          />
          <Route
            path="/applications"
            element={
              <ApplicationsPage user={user} authLoading={authLoading} onSignIn={onSignIn} />
            }
          />
          <Route
            path="/analytics"
            element={
              <AnalyticsPage user={user} authLoading={authLoading} onSignIn={onSignIn} />
            }
          />
          <Route
            path="/onboarding"
            element={
              <OnboardingPage user={user} authLoading={authLoading} onSignIn={onSignIn} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {showNav && <SiteFooter links={navLinks} />}
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(Boolean(auth))
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!auth) {
      setAuthLoading(false)
      return undefined
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
        setAuthLoading(false)
      },
      (error) => {
        setAuthError(error.message)
        setAuthLoading(false)
      }
    )

    return unsubscribe
  }, [])

  async function handleSignIn() {
    if (!auth || !googleProvider) {
      setAuthError('Sign-in is unavailable: Firebase is not configured.')
      return
    }

    setAuthError('')
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        setAuthError(error.message)
      }
    }
  }

  async function handleSignOut() {
    if (!auth) {
      return
    }

    setAuthError('')
    try {
      await signOut(auth)
    } catch (error) {
      setAuthError(error.message)
    }
  }

  return (
    <BrowserRouter>
      <AppLayout
        user={user}
        authLoading={authLoading}
        authError={authError}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
    </BrowserRouter>
  )
}
