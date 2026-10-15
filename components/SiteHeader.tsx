import Link from "next/link";
import { asset, site } from "@/lib/site";

export default function SiteHeader({ backLink = false }: { backLink?: boolean }) {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="wordmark" href="/">Sahil Khan</Link>
        <nav aria-label="Primary">
          {backLink ? (
            <Link href="/#work">All work</Link>
          ) : (
            <>
              <a href="#work">Work</a>
              <a href="#modeling">Modeling</a>
              <a href="#experience">Experience</a>
            </>
          )}
          <a className="nav-cta" href={asset(site.resume)}>Résumé</a>
        </nav>
      </div>
    </header>
  );
}
