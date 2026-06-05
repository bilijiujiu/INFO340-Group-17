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

export default function Navbar({ links }) {
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
        </nav>
      </div>
    </header>
  )
}

export { SiteFooter }
