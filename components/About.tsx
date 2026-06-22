import { site } from "@/data/site";

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="container">
        <h2 id="about-heading" className="section-title">
          About Me
        </h2>
        <p className="about-summary">{site.about.summary}</p>
        <div className="metrics-grid">
          {site.about.metrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
        <div className="about-details">
          <div className="detail-card">
            <h3 className="detail-title">Education</h3>
            <p className="detail-main">{site.about.education.degree}</p>
            <p className="detail-sub">
              {site.about.education.school} · {site.about.education.period}
            </p>
          </div>
          <div className="detail-card">
            <h3 className="detail-title">Certification</h3>
            <p className="detail-main">{site.about.certification.name}</p>
            <p className="detail-sub">
              {site.about.certification.issuer} · {site.about.certification.date}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
