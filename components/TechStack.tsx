import { site } from "@/data/site";

export default function TechStack() {
  return (
    <section
      className="section tech-stack"
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
    >
      <div className="container">
        <h2 id="tech-stack-heading" className="section-title">
          Tech Stack
        </h2>
        <div className="skills-grid">
          {site.skills.map((group) => (
            <article key={group.category} className="skill-card">
              <h3 className="skill-category">{group.category}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item} className="skill-item">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
