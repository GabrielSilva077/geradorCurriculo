import React from 'react';
import '../../styles/CompactOnePage.css';
import { ResumeData } from '../../types/resume';
import { DraggableSection } from '../resume/DraggableSection';
import { SectionId } from '../../context/ResumeContext';
import { ExternalLink } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function CompactOnePage({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, projects, languages } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'summary':
        return personal.summary ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="section-title">Resumo</h2>
              <p className="summary-text">{personal.summary}</p>
            </section>
          </DraggableSection>
        ) : null;

      case 'experience':
        return experience.length ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="section-title">Experiência</h2>
              <div className="experience-list">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="experience-header">
                      <h3 className="experience-role">{exp.position}</h3>
                      <span className="experience-date">
                        {exp.startDate} - {exp.current ? 'Pres.' : exp.endDate}
                      </span>
                    </div>
                    <div className="experience-company">{exp.company}</div>
                    <p className="experience-description">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case 'projects':
        return projects.length ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="section-title">Projetos</h2>
              <div className="projects-grid">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <h3 className="project-title">{proj.name}</h3>                  <div key={proj.id}>

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
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case 'skills':
        return skills.length ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="section-title">Habilidades</h2>
              <div className="skills-list">
                {skills.map(skill => (
                  <span key={skill.id} className="skill-badge">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case 'education':
        return education.length ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="section-title">Educação</h2>
              <div className="education-list">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="education-institution">{edu.institution}</h3>
                    <div className="education-degree">{edu.degree}</div>
                    <div className="education-date">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case 'languages':
        return languages.length ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section">
              <h2 className="section-title">Idiomas</h2>
              <div className="languages-list">
                {languages.map(lang => (
                  <div key={lang.id} className="language-item">
                    <span>{lang.name}</span>
                    <span className="language-level">{lang.level}</span>
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

  const mainSections: SectionId[] = ['summary', 'experience', 'projects'];
  const sidebarSections: SectionId[] = ['skills', 'education', 'languages'];

  return (
    <div className="resume">
      <header className="resume-header">
        <div>
          <h1 className="resume-name">{personal.fullName}</h1>
          <p className="resume-title">{personal.title}</p>
        </div>

        <div className="resume-contact">
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.location}</div>
          {personal.linkedin && (
            <div>{personal.linkedin.replace('https://', '')}</div>
          )}
        </div>
      </header>

      <div className="resume-grid">
        <div className="main-column">
          {sectionOrder
            .filter(id => mainSections.includes(id))
            .map(id => renderSection(id))}
        </div>

        <div className="sidebar-column">
          {sectionOrder
            .filter(id => sidebarSections.includes(id))
            .map(id => renderSection(id))}
        </div>
      </div>
    </div>
  );
}
