import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/data/site";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-blur-track" aria-hidden="true" />
      <div className="container header-shell">
        <div className="header-glass">
          <Link href="/" className="logo-link" aria-label="Junaid Sarwar — home">
            <Image
              src="/static/images/logo.svg"
              alt=""
              width={40}
              height={40}
              priority
              className="logo-image"
            />
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            <ul className="nav-list">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <a
              href={site.calendly}
              className="btn btn-primary btn-header"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Call
            </a>
            <ThemeToggle />
            <button
              type="button"
              className="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded="false"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
