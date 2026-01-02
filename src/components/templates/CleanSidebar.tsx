import React from "react";
import { ResumeData } from "../../types/resume";
import { DraggableSection } from "../resume/DraggableSection";
import { SectionId } from "../../context/ResumeContext";
import "../../styles/CleanSidebar.css";
import { ExternalLink } from "lucide-react";
interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function CleanSidebar({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, languages, projects } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "skills":
        return skills.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section mb-6">
              <h3 className="sidebar-title">Skills</h3>

              <div className="skills-space">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="skill-label">
                      <span>{skill.name}</span>
                    </div>

                    <div className="skill-bar">
                      <div
                        className="skill-fill"
                        style={{
                          width:
                            skill.level === "Especialista"
                              ? "100%"
                              : skill.level === "Avançado"
                              ? "80%"
                              : skill.level === "Intermediário"
                              ? "60%"
                              : "40%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "languages":
        return languages.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section mb-6">
              <h3 className="sidebar-title">Idiomas</h3>

              <ul className="languages-list">
                {languages.map((lang) => (
                  <li key={lang.id}>
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-level">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          </DraggableSection>
        ) : null;

      case "summary":
        return personal.summary ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section mb-10">
              <h2 className="main-title">
                <span className="title-bar"></span>
                Perfil Profissional
              </h2>

              <p className="paragraph">{personal.summary}</p>
            </section>
          </DraggableSection>
        ) : null;

      case "experience":
        return experience.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section mb-10">
              <h2 className="main-title">
                <span className="title-bar"></span>
                Experiência
              </h2>

              <div className="experience-space">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="experience-header">
                      <h3 className="job-title">{exp.position}</h3>
                      <span className="job-date">
                        {exp.startDate} –{" "}
                        {exp.current ? "Presente" : exp.endDate}
                      </span>
                    </div>

                    <div className="company">{exp.company}</div>

                    <p className="paragraph small">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section mb-10">
              <h2 className="main-title">
                <span className="title-bar"></span>
                Formação
              </h2>

              <div className="education-space">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="education-title">{edu.institution}</h3>
                    <div className="company">{edu.degree}</div>
                    <div className="education-date">
                      {edu.startDate} – {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section mb-10">
              <h2 className="main-title">
                <span className="title-bar"></span>
                Projetos
              </h2>

              <div className="projects-space">
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

      default:
        return null;
    }
  };

  const sidebarSections: SectionId[] = ["skills", "languages"];
  const mainSections: SectionId[] = [
    "summary",
    "experience",
    "education",
    "projects",
  ];

  return (
    <div className="resume">
      <aside className="sidebar">
        {personal.photoUrl && (
          <div className="photo">
            <img src={personal.photoUrl} alt={personal.fullName} />
          </div>
        )}

        <section className="section">
          <h3 className="sidebar-title">Contato</h3>

          <div className="contact">
            {personal.email && (
              <div>
                <strong>Email</strong>
                {personal.email}
              </div>
            )}
            {personal.phone && (
              <div>
                <strong>Telefone</strong>
                {personal.phone}
              </div>
            )}
            {personal.location && (
              <div>
                <strong>Localização</strong>
                {personal.location}
              </div>
            )}
            {personal.website && (
              <div>
                <strong>Site</strong>
                {personal.website}
              </div>
            )}
            {personal.linkedin && (
              <div>
                <strong>LinkedIn</strong>
                {personal.linkedin.replace("https://", "")}
              </div>
            )}
          </div>
        </section>

        {sectionOrder
          .filter((id) => sidebarSections.includes(id))
          .map(renderSection)}
      </aside>

      <main className="content">
        <header className="header">
          <h1>{personal.fullName}</h1>
          <p>{personal.title}</p>
        </header>

        {sectionOrder
          .filter((id) => mainSections.includes(id))
          .map(renderSection)}
      </main>
    </div>
  );
}
