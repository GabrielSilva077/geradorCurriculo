import React from "react";
import { ResumeData } from "../../types/resume";
import { Mail, Linkedin, Github, Terminal, ExternalLink } from "lucide-react";
import { DraggableSection } from "../resume/DraggableSection";
import { SectionId } from "../../context/ResumeContext";
import "../../styles/TechDeveloper.css";

interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function TechDeveloper({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, projects } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "summary":
        return personal.summary ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="td-section">
              <h2 className="td-heading">// README.md</h2>
              <p className="td-text">{personal.summary}</p>
            </section>
          </DraggableSection>
        ) : null;

      case "experience":
        return experience.length > 0 ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="td-section">
              <h2 className="td-heading">// EXPERIENCE</h2>

              <div className="td-timeline">
                {experience.map((exp) => (
                  <div key={exp.id} className="td-timeline-item">
                    <span className="td-dot"></span>

                    <div className="td-exp-header">
                      <h3>{exp.position}</h3>
                      <span className="td-badge">
                        {exp.startDate} — {exp.current ? "NOW" : exp.endDate}
                      </span>
                    </div>

                    <div className="td-company">@{exp.company}</div>

                    <p className="td-text pre">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="td-section">
              <h2 className="td-heading">// PROJECTS</h2>

              <div className="td-projects">
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

      case "skills":
        return skills.length > 0 ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="td-section">
              <h2 className="td-heading">// STACK</h2>

              <div className="td-skills">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="td-skill-header">
                      <strong>{skill.name}</strong>
                      <span>{skill.level}</span>
                    </div>
                    <div className="td-bar">
                      <div
                        className="td-bar-fill"
                        style={{
                          width:
                            skill.level === "Especialista"
                              ? "100%"
                              : skill.level === "Avançado"
                              ? "85%"
                              : skill.level === "Intermediário"
                              ? "60%"
                              : "30%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="td-section">
              <h2 className="td-heading">// EDUCATION</h2>

              <div className="td-education">
                {education.map((edu) => (
                  <div key={edu.id} className="td-card">
                    <h3>{edu.institution}</h3>
                    <div className="td-degree">{edu.degree}</div>
                    <div className="td-date">
                      {edu.startDate} - {edu.endDate}
                    </div>
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

  const mainColumnSections = ["summary", "experience", "projects"];
  const sidebarSections = ["skills", "education", "languages"];

  return (
    <div className="td-container">
      {/* Top Bar */}
      <header className="td-topbar">
        <div className="td-top-content">
          <div>
            <h1 className="td-name">
              <span>&lt;</span>
              {personal.fullName}
              <span>/&gt;</span>
            </h1>
            <p className="td-role">{personal.title}</p>
          </div>

          <Terminal size={48} className="td-terminal" />
        </div>

        <div className="td-links">
          {personal.email && (
            <div>
              <Mail size={14} />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.github && (
            <div>
              <Github size={14} />
              <span>{personal.github.replace("https://", "")}</span>
            </div>
          )}
          {personal.linkedin && (
            <div>
              <Linkedin size={14} />
              <span>{personal.linkedin.replace("https://", "")}</span>
            </div>
          )}
        </div>
      </header>

      <main className="td-content">
        <div className="td-main">
          {sectionOrder
            .filter((id) => mainColumnSections.includes(id))
            .map((id) => renderSection(id))}
        </div>

        <aside className="td-sidebar">
          {sectionOrder
            .filter((id) => sidebarSections.includes(id))
            .map((id) => renderSection(id))}
        </aside>
      </main>
    </div>
  );
}
