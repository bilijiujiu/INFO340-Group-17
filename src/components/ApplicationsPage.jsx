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

function JobKanbanCard({ company, role }) {
  const roleLines = role.map((line, i) => (
    <span key={line}>
      {line}
      {i < role.length - 1 && <br />}
    </span>
  ))

  return (
    <div className="job-card">
      <h3 className="job-company">{company}</h3>
      <p className="job-role">{roleLines}</p>
    </div>
  )
}

function ApplicationColumn({ title, cards }) {
  const cardElements = cards.map((card) => (
    <JobKanbanCard
      key={card.company}
      company={card.company}
      role={card.role}
    />
  ))

  return (
    <article className="column">
      <header className="column-header">{title}</header>
      {cardElements}
      <button type="button" className="add-card">
        Add card
      </button>
    </article>
  )
}

export default function ApplicationsPage() {
  const kanbanColumns = columns.map((column) => (
    <ApplicationColumn
      key={column.title}
      title={column.title}
      cards={column.cards}
    />
  ))

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
