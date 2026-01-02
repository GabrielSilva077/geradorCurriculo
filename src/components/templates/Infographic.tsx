import React from "react";
import { ResumeData } from "../../types/resume";
import {
  Briefcase,
  GraduationCap,
  User,
  Code,
  FolderGit2,
  Globe,
  ExternalLink,
} from "lucide-react";
import { DraggableSection } from "../resume/DraggableSection";
import { SectionId } from "../../context/ResumeContext";
import "../../styles/Infographic.css";

interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function Infographic({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, projects, languages } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "summary":
        return personal.summary ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="info-card">
              <header className="info-card-header">
                <User size={20} />
                <h2>Perfil</h2>
              </header>
              <p className="info-text">{personal.summary}</p>
            </section>
          </DraggableSection>
        ) : null;

      case "skills":
        return skills.length > 0 ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="info-card">
              <header className="info-card-header">
                <Code size={20} />
                <h2>Competências</h2>
              </header>

              <div className="skills-list">
                {skills.map((skill) => {
                  const levelWidth =
                    skill.level === "Especialista"
                      ? "95%"
                      : skill.level === "Avançado"
                      ? "70%"
                      : skill.level === "Intermediário"
                      ? "50%"
                      : skill.level === "Iniciante"
                      ? "25%"
                      : "0%";

                  return (
                    <div key={skill.id} className="skill-item">
                      <div className="skill-label">
                        <span>{skill.name}</span>
                        <span>{skill.level}</span>
                      </div>

                      <div className="skill-bar">
                        <div
                          className="skill-bar-fill"
                          style={{ width: levelWidth }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="info-card">
              <header className="info-card-header">
                <GraduationCap size={20} />
                <h2>Educação</h2>
              </header>

              <div className="education-list">
                {education.map((edu) => (
                  <div key={edu.id} className="education-item">
                    <h3>{edu.institution}</h3>
                    <span className="education-degree">{edu.degree}</span>
                    <span className="education-date">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "experience":
        return experience.length > 0 ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="info-card">
              <header className="info-card-header">
                <Briefcase size={20} />
                <h2>Carreira</h2>
              </header>

              <div className="experience-list">
                {experience.map((exp) => (
                  <div key={exp.id} className="experience-item">
                    <div className="experience-header">
                      <h3>{exp.position}</h3>
                      <span className="experience-date">
                        {exp.startDate} – {exp.current ? "Atual" : exp.endDate}
                      </span>
                    </div>

                    <span className="experience-company">{exp.company}</span>

                    <p className="experience-description">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="info-card info-card-dark">
              <header className="info-card-header accent">
                <FolderGit2 size={20} />
                <h2>Projetos</h2>
              </header>

              <div className="projects-list">
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
          <DraggableSection id={sectionId} key={sectionId}>
            <section className="info-card">
              <header className="info-card-header">
                <Globe size={20} />
                <h2>Idiomas</h2>
              </header>

              <div className="languages-list">
                {languages.map((lang) => (
                  <div key={lang.id} className="language-item">
                    <span>{lang.name}</span>
                    <span>{lang.level}</span>
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

  const left = ["summary", "skills", "education", "languages"];
  const right = ["experience", "projects"];

  return (
    <div className="infographic-container">
      <header className="infographic-header">
        {personal.photoUrl && (
          <div className="avatar">
            <img src={personal.photoUrl} alt={personal.fullName} />
          </div>
        )}

        <div className="header-info">
          <h1>{personal.fullName}</h1>
          <h2>{personal.title}</h2>

          <div className="header-meta">
            <span>{personal.email}</span>
            <span>{personal.location}</span>
          </div>
        </div>
      </header>

      <main className="infographic-grid">
        <div>
          {sectionOrder
            .filter((id) => left.includes(id))
            .map((id) => renderSection(id))}
        </div>

        <div>
          {sectionOrder
            .filter((id) => right.includes(id))
            .map((id) => renderSection(id))}
        </div>
      </main>
    </div>
  );
}
