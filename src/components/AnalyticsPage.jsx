const locations = [
  { city: 'SF, CA', fillClass: 'loc-fill-w75' },
  { city: 'LA, CA', fillClass: 'loc-fill-w45' },
  { city: 'New York', fillClass: 'loc-fill-w30' },
]

export default function AnalyticsPage() {
  const locationBars = locations.map((loc) => (
    <div key={loc.city}>
      <p className="loc-label">{loc.city}</p>
      <div className="loc-track">
        <div className={`loc-fill ${loc.fillClass}`}></div>
      </div>
    </div>
  ))

  return (
    <div className="page-wrapper">
      <main className="main-content">
        <section className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <input type="text" className="form-control filter-input" placeholder="Preferred job type" />
          </div>
          <div className="col-12 col-md-6">
            <input type="text" className="form-control filter-input" placeholder="Company" />
          </div>
        </section>

        <section className="row g-3 mb-3">
          <div className="col-6 col-md-3">
            <div className="kpi-tile">
              <p className="kpi-label">Total Apps</p>
              <p className="kpi-value">153,785</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="kpi-tile">
              <p className="kpi-label">Interview</p>
              <p className="kpi-value">18.7%</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="kpi-tile">
              <p className="kpi-label">Offer Rate</p>
              <p className="kpi-value">8.96%</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="kpi-tile">
              <p className="kpi-label">Viewed</p>
              <p className="kpi-value">350,078</p>
            </div>
          </div>
        </section>

        <section className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <article className="panel">
              <h3 className="panel-title">Application Status Distribution</h3>
              <div className="donut-wrapper">
                <div className="donut donut-status"></div>
              </div>
              <ul className="legend">
                <li><span className="dot dot-offer"></span>Offer Rate</li>
                <li><span className="dot dot-interview"></span>Interview</li>
                <li><span className="dot dot-rejected"></span>Rejected</li>
              </ul>
              <p className="insight">
                💡 36% of your applications are stuck at the Interview stage —
                consider following up to move them forward.
              </p>
            </article>
          </div>

          <div className="col-12 col-md-6">
            <article className="panel">
              <h3 className="panel-title">Education Level</h3>
              <div className="edu-row">
                <div className="edu-bar"><span>Bachelor</span></div>
                <span className="edu-pct">33%</span>
              </div>
              <div className="edu-row">
                <div className="edu-bar"><span>PHD</span></div>
                <span className="edu-pct">30%</span>
              </div>
              <div className="edu-row">
                <div className="edu-bar"><span>Master</span></div>
                <span className="edu-pct">36%</span>
              </div>
              <p className="insight">
                💡 Most saved jobs require a Master&apos;s degree — try filtering
                for roles that match your education level.
              </p>
            </article>
          </div>
        </section>

        <section className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <article className="panel">
              <h3 className="panel-title">Top Locations</h3>
              {locationBars}
              <ul className="loc-axis">
                <li>10%</li>
                <li>15%</li>
                <li>20%</li>
                <li>25%</li>
              </ul>
              <p className="insight">
                💡 SF has your highest application volume — focus your
                networking efforts there for stronger results.
              </p>
            </article>
          </div>

          <div className="col-12 col-md-6">
            <article className="panel">
              <h3 className="panel-title">Visa Sponsorship</h3>
              <div className="donut-wrapper">
                <div className="donut donut-visa"></div>
              </div>
              <ul className="legend">
                <li><span className="dot dot-sponsor"></span>Sponsors Visa</li>
                <li><span className="dot dot-novisa"></span>No Visa</li>
              </ul>
              <p className="insight">
                💡 60% of your saved jobs sponsor visas — a strong match for
                your sponsorship needs.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}
