const columns = [
  {
    title: 'Saved (12)',
    cards: [
      { company: 'Figma', role: ['UX', 'Engineer'] },
      { company: 'Notion', role: ['PM Intern'] },
    ],
  },
  {
    title: 'Applied (8)',
    cards: [
      { company: 'Google', role: ['SWE', 'Intern'] },
      { company: 'Stripe', role: ['Frontend'] },
    ],
  },
  {
    title: 'Interview (5)',
    cards: [{ company: 'Airbnb', role: ['Designer'] }],
  },
  {
    title: 'Offer (2)',
    cards: [{ company: 'Meta', role: ['Data', 'Analyst'] }],
  },
  {
    title: 'Rejected (8)',
    cards: [{ company: 'Amazon', role: ['SDE', 'Intern'] }],
  },
]

export default function ApplicationsPage() {
  const kanbanColumns = columns.map((column) => {
    const cards = column.cards.map((card) => {
      const roleLines = card.role.map((line, i) => (
        <span key={line}>
          {line}
          {i < card.role.length - 1 && <br />}
        </span>
      ))

      return (
        <div key={card.company} className="job-card">
          <h3 className="job-company">{card.company}</h3>
          <p className="job-role">{roleLines}</p>
        </div>
      )
    })

    return (
      <article key={column.title} className="column">
        <header className="column-header">{column.title}</header>
        {cards}
        <div className="add-card">+ Add card</div>
      </article>
    )
  })

  return (
    <div className="page-wrapper">
      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">My Applications</h1>
          <button type="button" className="btn-add-job">+ Add Job</button>
        </header>

        <section className="kanban">
          {kanbanColumns}
        </section>
      </main>
    </div>
  )
}
