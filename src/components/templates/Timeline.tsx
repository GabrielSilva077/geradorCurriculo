import React from "react";
import { ResumeData } from "../../types/resume";
import {
  Calendar,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  FolderGit2,
  ExternalLink,
} from "lucide-react";

import { DraggableSection } from "../resume/DraggableSection";
import { SectionId } from "../../context/ResumeContext";
import "../../styles/Timeline.css";

interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function Timeline({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, projects, languages } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "experience":
        return experience.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="timeline-section">
              <div className="timeline-title">
                <Briefcase size={16} />
                <span>Experiência</span>
              </div>

              {experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`timeline-item ${
                    index % 2 === 0 ? "left" : "right"
                  }`}
                >
                  <div className="timeline-content">
                    <h3 className="timeline-heading">{exp.position}</h3>
                    <div className="timeline-subtitle">{exp.company}</div>
                    <div className="timeline-date">
                      <Calendar size={14} />
                      <span>
                        {exp.startDate} –{" "}
                        {exp.current ? "Presente" : exp.endDate}
                      </span>
                    </div>
                    <p className="timeline-text">{exp.description}</p>
                  </div>

                  <div className="timeline-marker">
                    <span className="timeline-dot" />
                  </div>

                  <div className="timeline-spacer" />
                </div>
              ))}
            </section>
          </DraggableSection>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="timeline-section">
              <div className="timeline-title">
                <GraduationCap size={16} />
                <span>Formação</span>
              </div>

              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={`timeline-item ${
                    index % 2 === 0 ? "left" : "right"
                  }`}
                >
                  <div className="timeline-content">
                    <h3 className="timeline-heading">{edu.institution}</h3>
                    <div className="timeline-date">
                      {edu.startDate} – {edu.endDate}
                    </div>
                    <p className="timeline-text">
                      <strong>{edu.degree}</strong>
                      <br />
                      {edu.description}
                    </p>
                  </div>

                  <div className="timeline-marker">
                    <span className="timeline-dot" />
                  </div>

                  <div className="timeline-spacer" />
                </div>
              ))}
            </section>
          </DraggableSection>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="timeline-section">
              <div className="timeline-title">
                <FolderGit2 size={16} />
                <span>Projetos</span>
              </div>

              <div className="timeline-grid">
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
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="timeline-footer">
              <div className="timeline-title">
                <Code size={16} />
                <span>Habilidades</span>
              </div>

              <div className="tag-list">
                {skills.map((skill) => (
                  <span key={skill.id} className="tag">
                    {skill.name} • {skill.level}
                  </span>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "languages":
        return languages.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="timeline-footer">
              <div className="timeline-title">
                <Globe size={16} />
                <span>Idiomas</span>
              </div>

              <div className="tag-list">
                {languages.map((lang) => (
                  <span key={lang.id} className="tag">
                    {lang.name} • {lang.level}
                  </span>
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
    <div className="timeline-page">
      <header className="timeline-header">
        <h1>{personal.fullName}</h1>
        <h2>{personal.title}</h2>
        <p>{personal.summary}</p>
      </header>

      <div className="timeline-container">
        {sectionOrder
          .filter((id) => id !== "summary")
          .map((id) => renderSection(id))}
      </div>
    </div>
  );
}
