import { asset, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <h2>Get in touch</h2>
        <p className="footer-lede">
          Questions about a project, or a role you think I&apos;d fit? Email is the
          fastest way to reach me.
        </p>
        <a className="footer-email" href={`mailto:${site.email}`}>{site.email}</a>
        <p className="footer-alt">
          Also <a href={`mailto:${site.personalEmail}`}>{site.personalEmail}</a> (personal) and{" "}
          <a href={`mailto:${site.foundryEmail}`}>{site.foundryEmail}</a> (The Foundry).
        </p>
        <div className="footer-row">
          <span>© {new Date().getFullYear()} Sahil Khan</span>
          <nav aria-label="Elsewhere">
            <a href={site.linkedin}>LinkedIn</a>
            <a href={site.github}>GitHub</a>
            <a href={asset(site.resume)}>Engineering résumé</a>
            <a href={asset(site.leadershipResume)}>Leadership résumé</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
