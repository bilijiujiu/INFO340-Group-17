import { Link, useLocation } from 'react-router'

function SiteFooter({ links }) {
  const footerLinks = links.map(({ to, label }) => (
    <Link key={to} to={to}>{label}</Link>
  ))

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; 2026 JobTrack. Built for INFO 340, University of Washington.</p>
        <nav aria-label="Footer navigation" className="footer-nav">
          {footerLinks}
        </nav>
      </div>
    </footer>
  )
}

export default function Navbar({ links }) {
  const { pathname } = useLocation()
  const mainLinks = links.map(({ to, label }) => (
    <Link
      key={to}
      to={to}
      className={pathname === to ? 'active' : undefined}
    >
      {label}
    </Link>
  ))

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="site-logo" to="/">JobTrack</Link>
        <nav aria-label="Main navigation" className="top-nav">
          {mainLinks}
        </nav>
      </div>
    </header>
  )
}

export { SiteFooter }
