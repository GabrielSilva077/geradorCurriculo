import React from "react";
import { ResumeData } from "../../types/resume";
import { DraggableSection } from "../resume/DraggableSection";
import { SectionId } from "../../context/ResumeContext";
import "../../styles/ElegantPremium.css";
import { ExternalLink } from "lucide-react";
interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function ElegantPremium({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, projects, languages } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "summary":
        return personal.summary ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ep-section">
              <h2 className="ep-title">Perfil</h2>
              <p className="ep-summary">{personal.summary}</p>
            </section>
          </DraggableSection>
        ) : null;

      case "experience":
        return experience.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ep-section">
              <h2 className="ep-title">Experiência Profissional</h2>

              <div className="ep-experience">
                {experience.map((exp) => (
                  <div key={exp.id} className="ep-exp-item">
                    <div className="ep-exp-header">
                      <h3>{exp.position}</h3>
                      <span>
                        {exp.startDate} –{" "}
                        {exp.current ? "Presente" : exp.endDate}
                      </span>
                    </div>

                    <div className="ep-exp-company">{exp.company}</div>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ep-section">
              <h2 className="ep-title">Projetos</h2>

              <div className="ep-projects">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="project-title">{proj.name}</h3>

                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Abrir projeto em nova aba"
                        style={{ display: "inline-flex", cursor: "pointer" }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}

                    <p>{proj.description}</p>

                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer">
                        {proj.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ep-section">
              <h2 className="ep-title">Educação</h2>

              {education.map((edu) => (
                <div key={edu.id} className="ep-education-item">
                  <h3>{edu.institution}</h3>
                  <em>{edu.degree}</em>
                  <span>
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </section>
          </DraggableSection>
        ) : null;

      case "skills":
        return skills.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ep-section">
              <h2 className="ep-title">Expertise</h2>

              {skills.map((skill) => (
                <div key={skill.id} className="ep-skill-item">
                  <strong>{skill.name}</strong>
                  <span>{skill.level}</span>
                </div>
              ))}
            </section>
          </DraggableSection>
        ) : null;

      case "languages":
        return languages.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ep-section">
              <h2 className="ep-title">Idiomas</h2>

              {languages.map((lang) => (
                <div key={lang.id} className="ep-language-item">
                  <strong>{lang.name}</strong>
                  <span>{lang.level}</span>
                </div>
              ))}
            </section>
          </DraggableSection>
        ) : null;

      default:
        return null;
    }
  };

  const mainSections: SectionId[] = ["summary", "experience", "projects"];
  const sidebarSections: SectionId[] = ["education", "skills", "languages"];

  return (
    <div className="ep-root">
      {/* HEADER */}
      <header className="ep-header">
        <h1>{personal.fullName}</h1>
        <h2>{personal.title}</h2>

        <div className="ep-contacts">
          <span>{personal.email}</span>
          <span className="dot">•</span>
          <span>{personal.phone}</span>
          <span className="dot">•</span>
          <span>{personal.location}</span>
        </div>
      </header>

      {/* GRID FIXO */}
      <div className="ep-grid">
        <main>
          {sectionOrder
            .filter((id) => mainSections.includes(id))
            .map((id) => renderSection(id))}
        </main>

        <aside>
          {sectionOrder
            .filter((id) => sidebarSections.includes(id))
            .map((id) => renderSection(id))}
        </aside>
      </div>
    </div>
  );
}
