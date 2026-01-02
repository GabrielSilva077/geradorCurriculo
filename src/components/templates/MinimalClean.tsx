import React from "react";
import { ResumeData } from "../../types/resume";
import { SectionId } from "../../context/ResumeContext";
import { DraggableSection } from "../resume/DraggableSection";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import "../../styles/MinimalClean.css";

interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function MinimalClean({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, languages, projects } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "experience":
        return experience.length > 0 ? (
          <DraggableSection id="experience" key="experience">
            <section className="mc-section">
              <h2 className="mc-title">Experiência Profissional</h2>

              <div className="mc-experience-list">
                {experience.map((exp) => (
                  <div key={exp.id} className="mc-experience-item">
                    <div className="mc-experience-header">
                      <h3>{exp.position}</h3>
                      <span>
                        {exp.startDate} –{" "}
                        {exp.current ? "Atualmente" : exp.endDate}
                      </span>
                    </div>

                    <div className="mc-company">{exp.company}</div>

                    <p className="mc-description">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <DraggableSection id="education" key="education">
            <section className="mc-section">
              <h2 className="mc-title">Formação</h2>

              <div className="mc-education-list">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3>{edu.institution}</h3>
                    <div className="mc-degree">{edu.degree}</div>
                    <div className="mc-date">
                      {edu.startDate} –{" "}
                      {edu.current ? "Atualmente" : edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "skills":
        return skills.length > 0 ? (
          <DraggableSection id="skills" key="skills">
            <section className="mc-section">
              <h2 className="mc-title">Habilidades</h2>

              <div className="mc-skills">
                {skills.map((skill) => (
                  <span key={skill.id} className="mc-skill">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "languages":
        return languages.length > 0 ? (
          <DraggableSection id="languages" key="languages">
            <section className="mc-section">
              <h2 className="mc-title">Idiomas</h2>

              <div className="mc-languages">
                {languages.map((lang) => (
                  <div key={lang.id} className="mc-language">
                    <strong>{lang.name}</strong>
                    <span>• {lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <DraggableSection id="projects" key="projects">
            <section className="mc-section">
              <h2 className="mc-title">Projetos</h2>

              <div className="mc-projects">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="mc-project-header">
                      <h3>{proj.name}</h3>

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
                    </div>
                    <p>{proj.description}</p>
                    {proj.link && (
                      <a href={`${proj.link}`} target="_blank" rel="noreferrer">
                        {proj.link}
                      </a>
                    )}
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
    <div className="mc-container">
      {/* Header fixo */}
      <header className="mc-header">
        <h1>{personal.fullName}</h1>
        <p className="mc-role">{personal.title}</p>

        <div className="mc-contacts">
          {personal.email && (
            <div>
              <Mail size={14} />
              <span>{personal.email}</span>
            </div>
          )}

          {personal.phone && (
            <div>
              <Phone size={14} />
              <span>{personal.phone}</span>
            </div>
          )}

          {personal.location && (
            <div>
              <MapPin size={14} />
              <span>{personal.location}</span>
            </div>
          )}

          {personal.website && (
            <div>
              <Globe size={14} />
              <span>{personal.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary fixo */}
      {personal.summary && (
        <section className="mc-section">
          <h2 className="mc-title">Sobre</h2>
          <p className="mc-summary">{personal.summary}</p>
        </section>
      )}

      {/* Seções arrastáveis */}
      <div className="mc-draggable">
        {sectionOrder.map((id) => renderSection(id))}
      </div>
    </div>
  );
}
