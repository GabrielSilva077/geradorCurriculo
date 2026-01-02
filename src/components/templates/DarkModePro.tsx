import React from "react";
import { ResumeData } from "../../types/resume";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  ExternalLink,
} from "lucide-react";
import { DraggableSection } from "../resume/DraggableSection";
import { SectionId } from "../../context/ResumeContext";
import "../../styles/DarkModePro.css";

interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function DarkModePro({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, projects, languages } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "summary":
        return personal.summary ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="section-title">
                <span className="section-bar"></span>
                Sobre Mim
              </h2>
              <p className="section-text">{personal.summary}</p>
            </section>
          </DraggableSection>
        ) : null;

      case "experience":
        return experience.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="section-title">
                <span className="section-bar"></span>
                Experiência
              </h2>

              <div className="timeline">
                {experience.map((exp) => (
                  <div key={exp.id} className="timeline-item">
                    <span className="timeline-dot"></span>

                    <h3 className="timeline-role">{exp.position}</h3>
                    <span className="timeline-company">{exp.company}</span>
                    <span className="timeline-date">
                      {exp.startDate} — {exp.current ? "Presente" : exp.endDate}
                    </span>

                    <p className="timeline-description">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="section-title">
                <span className="section-bar"></span>
                Projetos
              </h2>

              <div className="projects-grid">
                {projects.map((proj) => (
                  <div key={proj.id} className="project-card">
                    <div className="project-header">
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

      case "skills":
        return skills.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="sidebar-title">Skills</h2>
              <div className="skills-list">
                {skills.map((skill) => (
                  <span key={skill.id} className="skill-pill">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="sidebar-title">Educação</h2>
              {education.map((edu) => (
                <div key={edu.id} className="education-item">
                  <strong>{edu.institution}</strong>
                  <span>{edu.degree}</span>
                  <small>
                    {edu.startDate} - {edu.endDate}
                  </small>
                </div>
              ))}
            </section>
          </DraggableSection>
        ) : null;

      case "languages":
        return languages.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="sidebar-title">Idiomas</h2>
              {languages.map((lang) => (
                <div key={lang.id} className="language-item">
                  <span>{lang.name}</span>
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
  const sidebarSections: SectionId[] = ["skills", "education", "languages"];

  return (
    <div className="resume-root">
      {/* HEADER */}
      <header className="resume-header">
        <div>
          <h1>{personal.fullName}</h1>
          <h2>{personal.title}</h2>
        </div>

        <div className="header-contacts">
          {personal.email && (
            <span>
              <Mail size={14} /> {personal.email}
            </span>
          )}
          {personal.phone && (
            <span>
              <Phone size={14} /> {personal.phone}
            </span>
          )}
          {personal.location && (
            <span>
              <MapPin size={14} /> {personal.location}
            </span>
          )}
        </div>
      </header>

      {/* GRID FIXO */}
      <div className="content-grid">
        <main>
          {sectionOrder
            .filter((id) => mainSections.includes(id))
            .map((id) => renderSection(id))}
        </main>

        <aside>
          {sectionOrder
            .filter((id) => sidebarSections.includes(id))
            .map((id) => renderSection(id))}

          <section className="section">
            <h2 className="sidebar-title">Links</h2>

            {personal.linkedin && (
              <span>
                <Linkedin size={16} /> {personal.linkedin}
              </span>
            )}
            {personal.github && (
              <span>
                <Github size={16} /> {personal.github}
              </span>
            )}
            {personal.website && (
              <span>
                <Globe size={16} /> {personal.website}
              </span>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
