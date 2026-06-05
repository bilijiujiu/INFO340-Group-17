import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import Navbar, { SiteFooter } from './components/Navbar'
import LandingPage from './components/LandingPage'
import DashboardPage from './components/DashboardPage'
import JobSearchPage from './components/JobSearchPage'
import ApplicationsPage from './components/ApplicationsPage'
import AnalyticsPage from './components/AnalyticsPage'
import OnboardingPage from './components/OnboardingPage'
import JobDetailPage from './components/JobDetailPage'
import NotFoundPage from './components/NotFoundPage'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/job-search', label: 'Job Search' },
  { to: '/applications', label: 'Applications' },
  { to: '/analytics', label: 'Analytics' },
]

function AppLayout() {
  const { pathname } = useLocation()
  const showNav = pathname !== '/onboarding'

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {showNav && <Navbar links={navLinks} />}
      <div id="main-content" className="site-main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/job-search" element={<JobSearchPage />} />
          <Route path="/job/:id" element={<JobDetailPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {showNav && <SiteFooter links={navLinks} />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
