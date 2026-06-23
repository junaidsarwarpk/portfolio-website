import Image from "next/image";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 id="hero-heading" className="hero-title">
            {site.hero.greeting}{" "}
            <span className="hero-highlight">{site.hero.highlight}</span>
          </h1>
          <p className="hero-bio">{site.hero.bio}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Hire Me
            </a>
            <a href="#works" className="btn btn-secondary">
              View Work
            </a>
          </div>
          <div className="hero-social">
            <span className="hero-social-label">Follow me on</span>
            <div className="hero-social-links">
              {site.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <Image
                    src={link.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="social-link-icon"
                  />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-glow" aria-hidden="true" />
          <div className="hero-photo-frame">
            <div className="hero-photo-glass" aria-hidden="true" />
            <div className="hero-photo-wrap">
              <Image
                src="/static/images/profile.png"
                alt="Junaid Sarwar — Senior Software Engineer, AI Developer and JavaScript Developer in Lahore, Pakistan"
                width={730}
                height={1000}
                priority
                className="hero-photo"
                sizes="(max-width: 768px) 320px, 400px"
              />
            </div>
          </div>
          <div className="dot-grid" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className="dot" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
