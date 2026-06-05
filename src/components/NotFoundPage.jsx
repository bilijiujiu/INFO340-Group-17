import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="container">
      <div className="empty-state">
        <h1>Page not found</h1>
        <p>That URL does not match any page in JobTrack.</p>
        <Link to="/" className="btn btn-outline">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
