import InteractiveHand from "./InteractiveHand";

export default function EmgProstheticProject() {
  return <main className="case-page emg-case-page">
    <header className="case-nav"><a href="/">S.K<span>/26</span></a><a href="/#work">&larr; All projects</a></header>

    <section className="case-hero" id="overview">
      <div className="case-hero-copy"><p className="case-kicker">Biomedical system / Modular prosthetics</p><h1>EMG-Driven<br /><em>Prosthetic Hand</em></h1><p>A low-cost upper-limb platform that connects a serviceable mechanical linkage, embedded actuation, and muscle-signal intent prediction.</p><a href="#challenge">Explore the system &darr;</a></div>
      <div className="case-poster"><img src="/projects/prosthetics/emg-prosthetic-poster.png" alt="Engineering showcase poster for the low-cost modular prosthetic and its EMG control system" /></div>
    </section>

    <section className="case-facts" aria-label="Project facts">
      <div><span>My role</span><strong>System architecture &middot; EMG software</strong></div><div><span>Mechanical</span><strong>Modular 3D-printed linkage</strong></div><div><span>Embedded</span><strong>Raspberry Pi &middot; ATmega32U4</strong></div><div><span>Control</span><strong>MVC-normalized EMG intent</strong></div>
    </section>

    <nav className="case-progress" aria-label="Case study sections">
      <span>Case study</span>
      <a href="#challenge"><b>01</b> Challenge</a>
      <a href="#cad"><b>02</b> CAD</a>
      <a href="#system"><b>03</b> System</a>
      <a href="#signal"><b>04</b> Signal</a>
      <a href="#next"><b>05</b> Next</a>
    </nav>

    <section className="case-question" id="challenge"><p>01 / Design challenge</p><div><h2>How can a prosthetic hand stay capable, repairable, and approachable?</h2><p>Commercial upper-limb prostheses can be expensive and difficult to customize. The project addressed that constraint with a modular mechanical platform designed around 3D-printed parts, serviceable joints, and swappable interfaces.</p><p>The mechanical system and the EMG interface were developed as one product: the linkage had to deliver useful motion, while the control pipeline had to translate noisy muscle signals into reliable intent quickly enough to feel responsive.</p></div></section>

    <InteractiveHand />

    <section className="emg-system-section" id="system">
      <div className="emg-section-heading"><p>03 / Integrated system</p><h2>Mechanics, electronics, and software share one control loop.</h2></div>
      <div className="emg-system-grid">
        <article><span>MECHANICAL</span><h3>Serviceable linkage</h3><p>3D-printed members, steel bearings at pivots, a swappable attachment interface, and linear actuation form the physical platform.</p></article>
        <article><span>EMBEDDED</span><h3>Distributed control</h3><p>A Raspberry Pi Zero 2 W manages high-level logic and data while an ATmega32U4 handles actuator control and position feedback.</p></article>
        <article><span>SENSING</span><h3>Muscle input</h3><p>MyoWare 2.0 sensors capture EMG activity from the opposite limb for digitization, filtering, and intent inference.</p></article>
      </div>
    </section>

    <section className="emg-signal-section" id="signal">
      <div className="emg-section-heading"><p>04 / Signal-to-motion flow</p><h2>From muscle activation to commanded motion.</h2></div>
      <div className="emg-signal-flow">
        <article><b>01</b><span>Acquire</span><p>Record raw EMG and establish a maximum-voluntary-contraction baseline.</p></article>
        <i aria-hidden="true">&rarr;</i>
        <article><b>02</b><span>Condition</span><p>Filter and normalize the signal so intent can be compared across motion trials.</p></article>
        <i aria-hidden="true">&rarr;</i>
        <article><b>03</b><span>Infer</span><p>Map multi-channel activity to motion commands using the learned intent model.</p></article>
        <i aria-hidden="true">&rarr;</i>
        <article><b>04</b><span>Actuate</span><p>Send real-time commands to the motor controller and mechanical linkage.</p></article>
      </div>
      <p className="emg-signal-note">The page describes the public project workflow; unpublished model details and intellectual property are intentionally excluded.</p>
    </section>

    <section className="case-limits" id="next"><p>05 / Verification and next steps</p><div><h2>Prove the mechanism under repeated, human-centered use.</h2><p>The next phase is larger-scale user testing, repeated-load durability testing, and refinement of the intent model for users whose residual signals vary over time.</p><p>The team also identified hybrid-control research as a future direction, combining muscle signals with additional sensing to improve activation reliability and overall control.</p></div></section>

    <footer className="case-footer"><a href="/">&larr; Return to portfolio</a><a href="mailto:sk4363@drexel.edu">Discuss the work &nearr;</a></footer>
  </main>;
}
