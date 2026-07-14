const projects = [
  {
    id: "lattice",
    index: "01",
    eyebrow: "Research / CAD / FEA / Physical testing",
    title: "Tetra-chiral prosthetic lattice",
    summary:
      "A repeatable research workflow for exploring how chiral geometry can improve shock absorption and lightweight strength in prosthetic legs.",
    outcome:
      "Designed three unit-cell configurations, simulated their response, fabricated test articles, and compared compression behavior against a standard cylinder.",
    image: "/projects/prosthetics/tetra-chiral-poster.png",
    alt: "Research poster showing tetra-chiral prosthetic lattice design, FEA, compression tests, and results",
    tags: ["SolidWorks", "FEA", "ASTM testing", "3D printing"],
  },
  {
    id: "emg",
    index: "02",
    eyebrow: "Biomedical systems / Embedded / Signal processing",
    title: "Modular prosthetic hand with EMG intent prediction",
    summary:
      "A low-cost, modular upper-limb prosthetic that combines a serviceable mechanical platform with real-time muscle-signal processing.",
    outcome:
      "Led the system architecture across a 3D-printed hand, swappable end effectors, embedded motor control, and an EMG pipeline designed to reduce command latency.",
    image: "/projects/prosthetics/emg-prosthetic-poster.png",
    alt: "Engineering showcase poster for a low-cost modular prosthetic with EMG-driven intent prediction",
    tags: ["SolidWorks", "Raspberry Pi", "EMG", "Embedded control"],
  },
];

const feaFlow = [
  ["01", "Problem definition", "Geometry, material model, loads, and boundary conditions"],
  ["02", "Model preparation", "Meshing, solver-ready inputs, and validation checks"],
  ["03", "Computation", "Numerical solution with repeatable run configuration"],
  ["04", "Verification", "Convergence, analytical comparison, and failure review"],
  ["05", "Results", "Field plots, curves, metrics, and exportable reports"],
];

const cadFlow = [
  ["Design parameters", "Structured inputs and design constraints"],
  ["Python controller", "Validation, job orchestration, and error handling"],
  ["Siemens NX API", "Feature generation and CAD-to-Python automation"],
  ["MATLAB / Simulink", "Model-based simulation and performance evaluation"],
  ["JSON / CSV", "Portable outputs for review and downstream tooling"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Sahil Khan home">S.K<span>/26</span></a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#systems">Systems</a>
          <a href="#matlab">MATLAB</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-link" href="/resumes/sahil-khan-engineering-resume.pdf">Resume ↗</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-rail" aria-hidden="true"><span>SK</span><span>01</span><span>2026</span></div>
        <div className="hero-copy">
          <p className="kicker"><span /> Mechanical · Biomedical · Software</p>
          <h1>I build systems<br />from <em>signal</em><br />to <strong>structure.</strong></h1>
          <p className="hero-intro">I&apos;m Sahil Khan—an engineer working across CAD, simulation, embedded systems, automation, and biomedical product development. I turn technical constraints into tested prototypes and usable software.</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">Explore selected work</a>
            <a className="button ghost" href="mailto:sk4363@drexel.edu">Start a conversation</a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Abstract engineered lattice visualization">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="lattice"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="visual-note note-a">PARAMETRIC<br />GEOMETRY</div>
          <div className="visual-note note-b">VERIFIED<br />BY TEST</div>
          <div className="coordinate">39.9526° N / 75.1652° W</div>
        </div>
        <div className="hero-meta">
          <div><span>Current</span><strong>B.S. Biomedical Engineering<br />M.S. Biomechanics · Drexel</strong></div>
          <div><span>Focus</span><strong>Intelligent engineering tools<br />and physical systems</strong></div>
          <div><span>Status</span><strong>Open to technical collaborations<br />and ambitious problems</strong></div>
        </div>
      </section>

      <section className="section work" id="work">
        <div className="section-heading"><p>01 / Selected work</p><h2>Evidence over<br /><em>claims.</em></h2><span>Each case study begins with the problem and ends with what the evidence taught us.</span></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" id={project.id} key={project.id}>
              <div className="project-number">{project.index}</div>
              <div className="project-image"><img src={project.image} alt={project.alt} /></div>
              <div className="project-copy">
                <p className="eyebrow">{project.eyebrow}</p><h3>{project.title}</h3>
                <p>{project.summary}</p><p className="outcome"><span>Outcome</span>{project.outcome}</p>
                <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section systems" id="systems">
        <div className="section-heading"><p>02 / Engineering software</p><h2>Tools that make<br />analysis <em>repeatable.</em></h2><span>Architecture is shown where it is safe and useful. Sensitive implementation details remain private.</span></div>
        <article className="system-card fea-card">
          <div className="system-header"><div><p className="eyebrow">Numerical methods / Verification</p><h3>FEA software platform</h3></div><span className="status">In development</span></div>
          <p className="system-lede">A modular engineering simulation workflow built to make model setup, computation, verification, and result export explicit rather than hidden behind a one-click solve.</p>
          <div className="flow-grid">{feaFlow.map(([n,t,d]) => <div className="flow-step" key={n}><span>{n}</span><strong>{t}</strong><p>{d}</p></div>)}</div>
          <div className="output-grid">
            <div className="result-panel mesh-panel"><p>Mesh + boundary conditions</p><div className="mesh" /><span>Discretized model</span></div>
            <div className="result-panel field-panel"><p>Field visualization</p><div className="heat-field"><i /><i /><i /><i /><i /></div><span>Stress / displacement</span></div>
            <div className="result-panel chart-panel"><p>Verification curves</p><div className="mini-chart"><i /><i /><i /><i /><i /><i /></div><span>Convergence + comparison</span></div>
          </div>
          <p className="disclosure">Representative output types shown. Project code and sensitive implementation details are not published.</p>
        </article>

        <article className="system-card cad-card">
          <div className="system-header"><div><p className="eyebrow">CAD automation / Model-based simulation</p><h3>NX-to-MATLAB optimization pipeline</h3></div><span className="status private">Sanitized architecture</span></div>
          <p className="system-lede">A Python-controlled workflow that translates structured design parameters into repeatable Siemens NX geometry, connects the resulting model to MATLAB/Simulink evaluation, and returns review-ready data.</p>
          <div className="pipeline">{cadFlow.map(([t,d], index) => <div className="pipeline-step" key={t}><span>0{index + 1}</span><strong>{t}</strong><p>{d}</p>{index < cadFlow.length - 1 && <b aria-hidden="true">→</b>}</div>)}</div>
          <div className="code-window"><div className="code-top"><span /><span /><span /><em>automation_run.json</em></div><pre>{`{
  "design_id": "sample_042",
  "geometry_status": "validated",
  "simulation": {
    "run_state": "complete",
    "outputs": ["response.csv", "metrics.json"]
  }
}`}</pre></div>
          <p className="disclosure">Generalized from private engineering work. Organization-specific geometry, parameters, performance figures, and implementation details are intentionally excluded.</p>
        </article>

        <article className="reef-card">
          <div><p className="eyebrow">Biological design software</p><h3>REEF</h3></div>
          <p>Contributing to a platform that helps researchers reason about and design biological systems. The work is presented here only at a public product level; internal architecture and implementation remain private.</p>
          <a href="https://reef.bio" rel="noreferrer">Visit reef.bio ↗</a>
        </article>
      </section>

      <section className="section matlab-section" id="matlab">
        <div className="section-heading">
          <p>03 / MATLAB laboratory</p>
          <h2>Models built to<br /><em>answer questions.</em></h2>
          <span>A selected archive of simulation, signal-processing, optimization, and biomedical-computation work built in MATLAB and Simulink.</span>
        </div>

        <article className="matlab-feature">
          <div className="matlab-feature-copy">
            <p className="eyebrow">BCOPSim / Network science / ODE systems</p>
            <h3>COVID transmission across synthetic contact networks</h3>
            <p>Built with Alexandra Nickel and Lily Wagner, the project combines two complementary epidemic models: a continuous SEIR system solved with <code>ode45</code>, and an agent-level contact-network simulation driven by a power-law degree distribution. The network model tracks each individual through susceptible, exposed, infectious, and recovered states.</p>
            <div className="matlab-facts">
              <div><span>Scale</span><strong>10,000 simulated individuals</strong></div>
              <div><span>Methods</span><strong>SEIR · ODE45 · graph models</strong></div>
              <div><span>Experiments</span><strong>Contact, recovery, transmission, quarantine</strong></div>
            </div>
            <p className="outcome"><span>What it demonstrated</span>The model made it possible to compare population-level dynamics with heterogeneous person-to-person transmission, then quantify how parameter changes shifted peak infections and time-to-peak.</p>
            <a className="matlab-report-link" href="/matlab/bcopsim-report.docx" download>Read the full project report <span>DOCX ↗</span></a>
          </div>
          <div className="matlab-gallery">
            <figure className="gallery-wide"><img src="/matlab/bcopsim-contact-network.png" alt="SEIR state changes across a contact network on days 1, 42, and 100" /><figcaption>Contact-network state propagation · Day 1 → Day 42 → Day 100</figcaption></figure>
            <figure><img src="/matlab/bcopsim-parameters.jpg" alt="MATLAB parameter analysis plots for contact, transmission, and recovery rates" /><figcaption>Parameter sensitivity</figcaption></figure>
            <figure><img src="/matlab/bcopsim-quarantine.jpg" alt="MATLAB plots showing quarantine effects on peak infections and time to peak" /><figcaption>Quarantine intervention study</figcaption></figure>
          </div>
        </article>

        <div className="matlab-project-grid">
          <article className="matlab-project image-project">
            <div className="matlab-project-image"><img src="/matlab/emg-interface.png" alt="MATLAB interface displaying raw and processed EMG signals" /></div>
            <div><p className="eyebrow">Signal processing / Interface design</p><h3>Configurable EMG analysis pipeline</h3><p>A MATLAB workflow for importing muscle signals, applying selectable Butterworth filtering, rectification, and moving-window smoothing, then measuring maximum voluntary contraction over a chosen time window.</p><ul><li>Band-pass, high-pass, and low-pass paths</li><li>Zero-phase filtering with <code>filtfilt</code></li><li>MVC normalization and database export</li></ul></div>
          </article>

          <article className="matlab-project image-project">
            <div className="matlab-project-image"><img src="/matlab/muscle-spindle.png" alt="Simulink model of a muscle spindle feedback system" /></div>
            <div><p className="eyebrow">Simulink / Physiological systems</p><h3>Muscle-spindle feedback model</h3><p>Modeled a physiological feedback system in Simulink to connect stimulus, dynamic response, and feedback behavior in a visual block-based simulation.</p><ul><li>Dynamic-system decomposition</li><li>Signal flow and feedback loops</li><li>Time-domain response analysis</li></ul></div>
          </article>

          <article className="matlab-project protein-project">
            <div className="protein-visual" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div><p className="eyebrow">Optimization / Computational biology</p><h3>Protein folding with a genetic algorithm</h3><p>Defined a three-dimensional fitness function that rewards feasible hydrogen bonds while penalizing invalid consecutive-residue spacing and nonconsecutive steric collisions.</p><ul><li>3D coordinate optimization</li><li>Distance-matrix evaluation</li><li>Constraint-aware fitness scoring</li></ul></div>
          </article>

          <article className="matlab-project image-project">
            <div className="matlab-project-image cell-image"><img src="/matlab/cell-counting.jpg" alt="Microscope image used for MATLAB cell segmentation and counting" /></div>
            <div><p className="eyebrow">Image processing / Biomedical computation</p><h3>Automated cell segmentation and counting</h3><p>Created an image-processing pipeline that converts microscopy data into a connected-component count through edge detection and morphological cleanup.</p><ul><li>Sobel edge detection</li><li>Dilation, hole filling, and erosion</li><li>Connected-component measurement</li></ul></div>
          </article>

          <article className="matlab-project covid-project">
            <div className="matlab-project-image"><img src="/matlab/simbiology-covid.png" alt="MATLAB SimBiology COVID model and simulation results" /></div>
            <div><p className="eyebrow">SimBiology / Systems modeling</p><h3>Compartment-model experimentation</h3><p>Used SimBiology to express biological state transitions, run simulations, and inspect how parameterized interactions change system behavior over time.</p><ul><li>Species and reaction modeling</li><li>Parameterized simulation</li><li>Visual result inspection</li></ul></div>
          </article>

          <article className="matlab-project parameter-project">
            <div className="parameter-visual"><span>k</span><span>c</span><span>x₀</span><span>v₀</span><b>min Σ error(t)</b></div>
            <div><p className="eyebrow">Parameter estimation / Numerical methods</p><h3>Mass-spring-damper parameter fitting</h3><p>Constructed an objective function that simulates a dynamic system and compares its response against experimental time-series data to estimate unknown physical parameters.</p><ul><li>Improved Euler integration</li><li>Simulation-to-data error metric</li><li>Optimization-ready parameter vector</li></ul></div>
          </article>
        </div>
        <p className="matlab-note">Selected from a larger archive of MATLAB coursework and engineering tools. The emphasis here is on projects with a clear model, computational method, and interpretable result.</p>
      </section>

      <section className="section experience" id="experience">
        <div className="section-heading"><p>04 / Field experience</p><h2>From research<br />to <em>production.</em></h2></div>
        <div className="timeline">
          <article><time>2025—2026</time><div><h3>U.S. Naval Research Laboratory</h3><p>Spacecraft Mechanisms Design Engineer Co-op</p><span>MATLAB/Simulink controls · Siemens NX · robotic mechanisms · test fixtures · CAD automation</span></div></article>
          <article><time>2025—Present</time><div><h3>The Foundry</h3><p>Co-Founder</p><span>Building Philadelphia&apos;s builder-led founder community and connecting 10,000+ people through programs, events, mentorship, and capital access.</span></div></article>
          <article><time>2024—2025</time><div><h3>Estée Lauder Companies</h3><p>Manufacturing Engineer</p><span>Process validation, technical documentation, regulated manufacturing, and a measured 15% reduction in manufacturing cost.</span></div></article>
          <article><time>2024—Present</time><div><h3>Drexel IEEE</h3><p>President</p><span>Leading a 700+ member technical community, a five-person executive board, and a growing industry partnership program.</span></div></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <p>05 / Contact</p><h2>Have a hard problem?<br /><em>Let&apos;s build the evidence.</em></h2>
        <div className="contact-links">
          <a href="mailto:sk4363@drexel.edu"><span>School</span>sk4363@drexel.edu ↗</a>
          <a href="mailto:skhan101905@gmail.com"><span>Personal</span>skhan101905@gmail.com ↗</a>
          <a href="mailto:sahil@foundryphl.com"><span>Foundry</span>sahil@foundryphl.com ↗</a>
        </div>
        <div className="footer-row"><span>© 2026 Sahil Khan</span><div><a href="https://www.linkedin.com/in/sahil-k2/">LinkedIn</a><a href="https://github.com/Sahil101905">GitHub</a><a href="/resumes/sahil-khan-engineering-resume.pdf">Engineering résumé</a><a href="/resumes/sahil-khan-leadership-resume.pdf">Leadership résumé</a></div></div>
      </section>
    </main>
  );
}
