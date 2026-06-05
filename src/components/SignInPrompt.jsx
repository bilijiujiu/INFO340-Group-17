export default function SignInPrompt({ title, message, onSignIn }) {
  return (
    <main className="container">
      <section className="sign-in-prompt" aria-live="polite">
        <h1>{title}</h1>
        <p>{message}</p>
        <button type="button" className="btn btn-primary" onClick={onSignIn}>
          Sign in with Google
        </button>
      </section>
    </main>
  )
}
