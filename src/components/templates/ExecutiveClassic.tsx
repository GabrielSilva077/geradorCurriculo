import React from "react";
import { ResumeData } from "../../types/resume";
import { DraggableSection } from "../resume/DraggableSection";
import { SectionId } from "../../context/ResumeContext";
import "../../styles/ExecutiveClassic.css";
import { ExternalLink } from "lucide-react";
interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function ExecutiveClassic({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, projects, languages } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "summary":
        return personal.summary ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ec-section">
              <h2 className="ec-title">Resumo Profissional</h2>
              <p className="ec-text">{personal.summary}</p>
            </section>
          </DraggableSection>
        ) : null;

      case "experience":
        return experience.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ec-section">
              <h2 className="ec-title">Experiência Profissional</h2>

              <div className="ec-list">
                {experience.map((exp) => (
                  <div key={exp.id} className="ec-item">
                    <div className="ec-exp-header">
                      <h3>{exp.company}</h3>
                      <span>
                        {exp.startDate} –{" "}
                        {exp.current ? "Presente" : exp.endDate}
                      </span>
                    </div>

                    <div className="ec-role">{exp.position}</div>
                    <p className="ec-text">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ec-section">
              <h2 className="ec-title">Formação Acadêmica</h2>

              <div className="ec-list">
                {education.map((edu) => (
                  <div key={edu.id} className="ec-edu-item">
                    <div>
                      <strong>{edu.institution}</strong>
                      <div className="ec-italic">{edu.degree}</div>
                    </div>
                    <span>
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "skills":
        return skills.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ec-section">
              <h2 className="ec-title">Competências</h2>

              <div className="ec-grid">
                {skills.map((skill) => (
                  <div key={skill.id} className="ec-skill-item">
                    <span>{skill.name}</span>
                    <em>{skill.level}</em>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ec-section">
              <h2 className="ec-title">Projetos</h2>

              <div className="ec-list">
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

      case "languages":
        return languages.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="ec-section">
              <h2 className="ec-title">Idiomas</h2>

              <div className="ec-grid">
                {languages.map((lang) => (
                  <div key={lang.id} className="ec-skill-item">
                    <span>{lang.name}</span>
                    <em>{lang.level}</em>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="ec-root">
      {/* HEADER */}
      <header className="ec-header">
        <h1>{personal.fullName}</h1>
        <h2>{personal.title}</h2>

        <div className="ec-contacts">
          <span>{personal.email}</span>
          <span>•</span>
          <span>{personal.phone}</span>
          <span>•</span>
          <span>{personal.location}</span>
          {personal.linkedin && (
            <>
              <span>•</span>
              <span>{personal.linkedin}</span>
            </>
          )}
        </div>
      </header>

      {/* CONTENT */}
      {sectionOrder.map((id) => renderSection(id))}
    </div>
  );
}
