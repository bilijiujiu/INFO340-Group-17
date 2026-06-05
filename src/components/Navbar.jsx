import { useState } from 'react'
import { Link, useLocation } from 'react-router'

function SiteFooter({ links }) {
  const footerLinks = links.map(({ to, label }) => (
    <Link key={to} to={to}>{label}</Link>
  ))

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; 2026 JobTrack. Built for INFO 340, University of Washington.</p>
        <nav className="footer-nav" aria-label="Footer navigation">
          {footerLinks}
        </nav>
      </div>
    </footer>
  )
}

function getDisplayName(user) {
  if (!user) {
    return ''
  }

  return user.displayName || user.email || 'Account'
}

function UserMenu({ user, onSignOut }) {
  const [isOpen, setIsOpen] = useState(false)
  const displayName = getDisplayName(user)

  function closeMenu() {
    setIsOpen(false)
  }

  function handleSignOut() {
    closeMenu()
    onSignOut()
  }

  return (
    <div className="user-menu">
      <button
        type="button"
        className="user-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="user-menu-avatar" aria-hidden="true">
          {displayName.charAt(0).toUpperCase()}
        </span>
        <span className="user-menu-name">{displayName}</span>
        <span className="user-menu-caret" aria-hidden="true">▾</span>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="user-menu-backdrop"
            aria-label="Close account menu"
            onClick={closeMenu}
          />
          <div className="user-menu-dropdown" role="menu">
            <div className="user-menu-header">
              <p className="user-menu-display-name">{displayName}</p>
              {user.email && <p className="user-menu-email">{user.email}</p>}
            </div>
            <div className="user-menu-divider" aria-hidden="true" />
            <Link
              to="/dashboard"
              className="user-menu-item"
              role="menuitem"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/onboarding"
              className="user-menu-item"
              role="menuitem"
              onClick={closeMenu}
            >
              My Preferences
            </Link>
            <div className="user-menu-divider" aria-hidden="true" />
            <button
              type="button"
              className="user-menu-item user-menu-signout"
              role="menuitem"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function AuthControls({ user, authLoading, onSignIn, onSignOut }) {
  if (authLoading) {
    return <span className="auth-status" aria-live="polite">Checking sign-in...</span>
  }

  if (!user) {
    return (
      <button type="button" className="btn btn-primary auth-button" onClick={onSignIn}>
        Sign in with Google
      </button>
    )
  }

  return <UserMenu user={user} onSignOut={onSignOut} />
}

export default function Navbar({ links, user, authLoading, onSignIn, onSignOut }) {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const mainLinks = links.map(({ to, label }) => (
    <Link
      key={to}
      to={to}
      className={pathname === to ? 'active' : undefined}
      aria-current={pathname === to ? 'page' : undefined}
      onClick={() => setIsOpen(false)}
    >
      {label}
    </Link>
  ))

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="site-logo" to="/">JobTrack</Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle main navigation"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
        <nav
          id="main-navigation"
          className={`top-nav${isOpen ? ' open' : ''}`}
          aria-label="Main navigation"
        >
          {mainLinks}
          <AuthControls
            user={user}
            authLoading={authLoading}
            onSignIn={onSignIn}
            onSignOut={onSignOut}
          />
        </nav>
      </div>
    </header>
  )
}

export { SiteFooter }
