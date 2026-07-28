import VerificationExplorer from "./VerificationExplorer";

export default function NegativePressureHelmetProject() {
  return (
    <main className="case-page helmet-case-page">
      <header className="case-nav">
        <a href="/">S.K<span>/26</span></a>
        <a href="/#work">&larr; All projects</a>
      </header>

      <section className="case-hero helmet-case-hero" id="overview">
        <div className="case-hero-copy">
          <p className="case-kicker">Medical device design / Negative-pressure containment</p>
          <h1>Isolation<br /><em>Helmet</em></h1>
          <p>
            A low-cost bench prototype that combines a transparent enclosure,
            filtered exhaust, and model-based verification for aerosol
            containment during nebulizer treatment.
          </p>
          <a href="#challenge">Follow the design &darr;</a>
        </div>
        <div className="helmet-hero-visual">
          <img
            src="/projects/negative-pressure-helmet/prototype.webp"
            alt="Built negative-pressure helmet prototype with a transparent shell, neck seal, HEPA filter, and exhaust fan"
          />
          <div><span>TEAM 6001</span><strong>Prototype / 2025</strong></div>
        </div>
      </section>

      <section className="case-facts" aria-label="Project facts">
        <div><span>My role</span><strong>Component integration &middot; verification</strong></div>
        <div><span>System model</span><strong>MATLAB Simulink control volume</strong></div>
        <div><span>Prototype cost</span><strong>$68.08 of an $80 budget</strong></div>
        <div><span>Team</span><strong>Sahil Khan &middot; M. Muhlig &middot; R. Tabor &middot; R. Benamara</strong></div>
      </section>

      <nav className="case-progress" aria-label="Case study sections">
        <span>Case study</span>
        <a href="#challenge"><b>01</b> Need</a>
        <a href="#model"><b>02</b> Model</a>
        <a href="#build"><b>03</b> Build</a>
        <a href="#verification"><b>04</b> Verify</a>
        <a href="#learning"><b>05</b> Learn</a>
      </nav>

      <section className="case-question helmet-question" id="challenge">
        <p>01 / Unmet need</p>
        <div>
          <h2>Local containment without turning the room into the device.</h2>
          <p>
            Nebulizers generate medicated aerosol for inhalation, while
            exhaled droplets and fine particles can remain airborne. Hospital
            negative-pressure rooms address that risk, but they are fixed,
            expensive infrastructure and are not a practical answer for every
            long-term-care or home setting.
          </p>
          <p>
            The team reframed the room-scale problem around the patient&apos;s
            head: maintain inward leakage, preserve visibility and comfort,
            and route exhaust through filtration with components that could be
            assembled within a ten-week course and an $80 budget.
          </p>
        </div>
      </section>

      <section className="helmet-model-section" id="model">
        <div className="helmet-section-heading">
          <p>02 / Simulink model</p>
          <div>
            <h2>A control-volume model connected flow, volume, pressure, and air changes.</h2>
            <p>
              The public model from the project treats the helmet as a dynamic
              volume. Nebulizer input, breathing, filtered exhaust, leakage,
              compliance, and resistance combine to predict the values used to
              set design requirements.
            </p>
          </div>
        </div>
        <figure className="simulink-frame">
          <img
            src="/projects/negative-pressure-helmet/simulink-model.png"
            alt="Original Simulink model showing breathing and nebulizer inputs, helmet volume, resistance, compliance, pressure, and air-change outputs"
          />
          <figcaption>
            <span>Original project artifact</span>
            <strong>Simulink control-volume model</strong>
          </figcaption>
        </figure>
        <div className="helmet-model-flow">
          <article><span>INPUTS</span><strong>Breathing + nebulizer</strong><p>Time-varying patient and treatment flow enter the control volume.</p></article>
          <i>&rarr;</i>
          <article><span>DYNAMICS</span><strong>Volume + resistance</strong><p>Helmet compliance and leakage resistance convert net flow into pressure response.</p></article>
          <i>&rarr;</i>
          <article><span>EXHAUST</span><strong>Fan + HEPA path</strong><p>Filtered outward flow is sized to maintain negative pressure and remove aerosol.</p></article>
          <i>&rarr;</i>
          <article><span>OUTPUTS</span><strong>Pa + L + ACH</strong><p>Scopes report helmet pressure, available volume, and air changes per hour.</p></article>
        </div>
      </section>

      <section className="helmet-build-section" id="build">
        <div className="helmet-section-heading">
          <p>03 / Physical system</p>
          <div>
            <h2>Commodity parts became a testable respiratory enclosure.</h2>
            <p>
              The build paired a clear PET carboy with a compact suction fan,
              HEPA media, shoulder padding, and a flexible neck seal. The
              geometry made the airflow path visible and accessible for bench
              instrumentation.
            </p>
          </div>
        </div>
        <div className="helmet-build-grid">
          <figure className="helmet-concept">
            <img src="/projects/negative-pressure-helmet/concept.png" alt="Concept illustration of the negative-pressure helmet worn by a mannequin" />
            <figcaption>Concept layout</figcaption>
          </figure>
          <figure className="helmet-prototype">
            <img src="/projects/negative-pressure-helmet/prototype.webp" alt="Completed negative-pressure helmet course prototype" />
            <figcaption>As-built course prototype</figcaption>
          </figure>
          <div className="helmet-bom">
            <p>Core bill of materials</p>
            <div><span>01</span><strong>Clear 5-gallon PET carboy</strong><em>$33.49</em></div>
            <div><span>02</span><strong>Rechargeable suction fan</strong><em>$9.98</em></div>
            <div><span>03</span><strong>HEPA + sponge filter set</strong><em>$16.99</em></div>
            <div><span>04</span><strong>Shoulder foam</strong><em>$7.62</em></div>
            <footer><span>Total purchased</span><strong>$68.08</strong></footer>
          </div>
        </div>
      </section>

      <VerificationExplorer />

      <section className="helmet-learning-section" id="learning">
        <div className="helmet-section-heading">
          <p>05 / Engineering judgment</p>
          <div>
            <h2>The prototype passed the course matrix—and exposed the next design.</h2>
            <p>
              Sahil&apos;s work centered on component integration, standards-backed
              verification methods, final construction, and repeated testing.
              The project&apos;s strongest result was traceability: each design
              input had a physical measurement and a documented pass criterion.
            </p>
          </div>
        </div>
        <div className="helmet-learning-grid">
          <article><span>WHAT WORKED</span><h3>Model-to-bench agreement</h3><p>Pressure and flow behavior followed the expected negative-pressure response, giving the team a practical way to compare simulation and measurements.</p></article>
          <article><span>WHAT WAS WEAK</span><h3>Confidence was uneven</h3><p>Only three of five exhaust-flow trials exceeded the point threshold. The average passed, but more trials and a better test fixture would strengthen the claim.</p></article>
          <article><span>NEXT REVISION</span><h3>Comfort, sealing, acoustics</h3><p>Add an internal headrest, replace temporary neck-seal joints, quantify fan noise, and repeat testing with a breathing subject and nebulizer operating together.</p></article>
        </div>
      </section>

      <footer className="case-footer">
        <a href="/">&larr; Return to portfolio</a>
        <a href="mailto:sk4363@drexel.edu">Discuss the work &nearr;</a>
      </footer>
    </main>
  );
}
