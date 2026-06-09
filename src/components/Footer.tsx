import { Link } from "react-router-dom";
import { navLinks, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink-950/60">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <span className="font-serif text-2xl text-cream">{site.name}</span>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gold-300/80">
              {site.tagline}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              {site.baseline}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-cream/40">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-cream/65 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-cream/40">
              Nous trouver
            </h4>
            <address className="space-y-2.5 not-italic text-sm text-cream/65">
              <p>
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </p>
              <p>
                <a href={site.phoneHref} className="transition-colors hover:text-gold-300">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={site.emailHref} className="transition-colors hover:text-gold-300">
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-cream/40">
              Horaires
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/65">
              {site.hours.map((h) => (
                <li key={h.days} className="flex flex-col">
                  <span className="text-cream/80">{h.days}</span>
                  <span className="text-cream/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <div className="flex gap-5">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-cream/50 transition-colors hover:text-gold-300"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
