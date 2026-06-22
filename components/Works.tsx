import { site } from "@/data/site";

export default function Works() {
  return (
    <section className="section works" id="works" aria-labelledby="works-heading">
      <div className="container">
        <h2 id="works-heading" className="section-title">
          Works
        </h2>

        <div className="experience-list">
          {site.experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="experience-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-role">{job.role}</h3>
                  <p className="experience-company">{job.company}</p>
                </div>
                <div className="experience-meta">
                  <span>{job.period}</span>
                  <span>{job.location}</span>
                </div>
              </div>
              <ul className="experience-highlights">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="subsection-title">Featured Projects</h3>
        <div className="projects-grid">
          {site.projects.map((project) => (
            <article key={project.name} className="project-card">
              <h4 className="project-name">{project.name}</h4>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {"url" in project && project.url && (
                <a
                  href={project.url}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
