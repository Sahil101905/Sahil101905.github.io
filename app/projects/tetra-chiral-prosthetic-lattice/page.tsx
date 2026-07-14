import InteractiveLattice from "./InteractiveLattice";

export default function TetraChiralProject() {
  return <main className="case-page">
    <header className="case-nav"><a href="/">S.K<span>/26</span></a><a href="/#work">&larr; All projects</a></header>

    <section className="case-hero" id="overview">
      <div className="case-hero-copy"><p className="case-kicker">Flagship case study / Summer 2024</p><h1>Tetra-Chiral<br /><em>Prosthetic Lattice</em></h1><p>A design, simulation, fabrication, and compression-testing study of chiral structures for lightweight prosthetic applications.</p><a href="#question">Explore the study &darr;</a></div>
      <div className="case-poster"><img src="/projects/prosthetics/tetra-chiral-poster.png" alt="Research poster summarizing tetra-chiral lattice design, FEA, testing, and results" /></div>
    </section>

    <section className="case-facts" aria-label="Project facts">
      <div><span>My role</span><strong>CAD &middot; FEA &middot; fabrication &middot; testing</strong></div><div><span>Methods</span><strong>Nonlinear FEA + compression tests</strong></div><div><span>Tools</span><strong>SolidWorks &middot; additive manufacturing</strong></div><div><span>Output</span><strong>3 lattice variants + ASTM control</strong></div>
    </section>

    <nav className="case-progress" aria-label="Case study sections">
      <span>Case study</span>
      <a href="#question"><b>01</b> Question</a>
      <a href="#cad"><b>02</b> CAD</a>
      <a href="#simulation"><b>03</b> Evidence</a>
      <a href="#workflow"><b>04</b> Workflow</a>
      <a href="#verification"><b>05</b> Verification</a>
    </nav>

    <section className="case-question" id="question"><p>01 / Engineering question</p><div><h2>Can geometry redistribute load without adding unnecessary mass?</h2><p>Tetra-chiral structures use a central ring connected by curved ligaments. Under compression, that topology can produce coupled rotation and deformation. This project explored whether the geometry could balance shock absorption, flexibility, and structural strength in a prosthetic-leg concept.</p><p>Simulation alone could not capture every manufacturing and boundary-condition effect. Physical testing alone could not reveal the internal stress and strain fields. The study therefore used both.</p></div></section>

    <InteractiveLattice />

    <section className="case-process" id="workflow"><p>04 / Research workflow</p><div className="process-grid"><article><span>01</span><h3>Design</h3><p>Developed an ideal tetra-chiral unit cell, then produced scaled variations and tessellated concepts.</p></article><article><span>02</span><h3>Simulate</h3><p>Applied nonlinear compression studies to examine displacement, strain, stress, and response.</p></article><article><span>03</span><h3>Fabricate</h3><p>3D-printed lattice specimens and an ASTM-style cylindrical control for physical evaluation.</p></article><article><span>04</span><h3>Test</h3><p>Compared compression behavior across simulated and experimental specimens.</p></article></div></section>

    <section className="case-limits" id="verification"><p>05 / Verification</p><div><h2>Where the model matched&mdash;and where it could not.</h2><p>The combined workflow made simulation a testable hypothesis rather than a final answer. Differences between predicted and measured behavior can arise from idealized material properties, contact assumptions, mesh resolution, fixture alignment, print variation, and the boundary conditions used in the solver.</p><p>Those gaps are part of the engineering result: they define what should be calibrated, retested, and redesigned next.</p></div></section>

    <footer className="case-footer"><a href="/">&larr; Return to portfolio</a><a href="mailto:sk4363@drexel.edu">Discuss the work &nearr;</a></footer>
  </main>;
}
