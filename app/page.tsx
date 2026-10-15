import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { caseStudies, experience, modeling, software } from "@/lib/content";
import { asset, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container intro">
          <div className="intro-copy">
            <p className="intro-kicker">B.S. Biomedical Engineering + M.S. Biomechanics · Drexel ’28</p>
            <h1>I design mechanisms, model them, and test what I build.</h1>
            <p className="intro-lede">
              I&apos;m Sahil Khan, a biomedical engineering student in Philadelphia. My work spans
              prosthetic devices, spacecraft mechanisms at the U.S. Naval Research Laboratory,
              CAD automation and computational modeling.
            </p>
            <div className="intro-links">
              <a className="button" href={asset(site.resume)}>Résumé (PDF)</a>
              <a href={site.linkedin}>LinkedIn</a>
              <a href={site.github}>GitHub</a>
              <a href={`mailto:${site.email}`}>Email</a>
            </div>
          </div>
          <img className="intro-portrait" src={asset("/images/sahil-khan-headshot.jpg")} alt="Sahil Khan" width={800} height={800} />
        </section>

        <section className="container section" id="work">
          <div className="section-head">
            <h2>Selected work</h2>
            <p>Case studies with the requirements, design decisions, evidence and limits behind each result.</p>
          </div>
          <div className="work-list">
            {caseStudies.map((study) => (
              <Link className="work-card" href={`/projects/${study.slug}/`} key={study.slug}>
                <div className="work-media">
                  <img src={asset(study.cover)} alt={study.coverAlt} loading="lazy" />
                </div>
                <div className="work-body">
                  <p className="meta">{[study.year, study.context].filter(Boolean).join(" · ")}</p>
                  <h3>{study.title}</h3>
                  <p>{study.summary}</p>
                  <dl className="work-facts">
                    <div><dt>Role</dt><dd>{study.role}</dd></div>
                    <div><dt>Tools</dt><dd>{study.tools.join(", ")}</dd></div>
                  </dl>
                  <span className="text-link">Read the case study <span aria-hidden="true">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="container section" id="software">
          <div className="section-head">
            <h2>Engineering software</h2>
            <p>Tools I&apos;ve built or contributed to for CAD, simulation and analysis.</p>
          </div>
          <div className="row-list">
            {software.map((item) => (
              <article className="row" key={item.title}>
                <div className="row-title">
                  <h3>{item.title}</h3>
                  <span className="tag">{item.tag}</span>
                </div>
                <div className="row-body">
                  <p>{item.body}</p>
                  {item.note && <p className="fine">{item.note}</p>}
                  {item.link && <a className="text-link" href={item.link.href}>{item.link.label} <span aria-hidden="true">↗</span></a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container section" id="modeling">
          <div className="section-head">
            <h2>Modeling &amp; computation</h2>
            <p>Selected MATLAB and Simulink projects in simulation, signal processing and optimization.</p>
          </div>
          <div className="model-grid">
            {modeling.map((item) => (
              <article className={`model-card${item.image ? " has-image" : ""}`} key={item.title}>
                {item.image && <img src={asset(item.image)} alt={item.imageAlt} loading="lazy" />}
                <p className="meta">{item.method}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.gallery && (
                  <div className="model-gallery">
                    {item.gallery.map((figure) => (
                      <figure key={figure.src}><img src={asset(figure.src)} alt={figure.alt} loading="lazy" /><figcaption>{figure.caption}</figcaption></figure>
                    ))}
                  </div>
                )}
                {item.link && <a className="text-link" href={asset(item.link.href)} download>{item.link.label} <span aria-hidden="true">↓</span></a>}
              </article>
            ))}
          </div>
        </section>

        <section className="container section" id="experience">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          <ol className="timeline">
            {experience.map((item) => (
              <li key={item.org}>
                <span className="when">{item.when}</span>
                <div>
                  <h3>{item.org}</h3>
                  <p className="role">{item.role}</p>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
