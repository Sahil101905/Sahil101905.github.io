import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type Fact = { label: string; value: string };

export function CaseStudyPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader backLink />
      <main className="case">{children}</main>
      <SiteFooter />
    </>
  );
}

export function CaseHero({ kicker, title, lede, facts }: { kicker: string; title: string; lede: string; facts: Fact[] }) {
  return (
    <header className="container case-hero">
      <p className="meta">{kicker}</p>
      <h1>{title}</h1>
      <p className="case-lede">{lede}</p>
      <dl className="case-facts">
        {facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
      </dl>
    </header>
  );
}

export function CaseSection({ id, label, title, children, wide = false }: { id: string; label: string; title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <section className={`container case-section${wide ? " wide" : ""}`} id={id}>
      <div className="case-section-head">
        <p className="meta">{label}</p>
        <h2>{title}</h2>
      </div>
      <div className="case-section-body">{children}</div>
    </section>
  );
}

export function Figure({ src, alt, caption, className }: { src: string; alt: string; caption?: string; className?: string }) {
  return (
    <figure className={`figure${className ? ` ${className}` : ""}`}>
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
