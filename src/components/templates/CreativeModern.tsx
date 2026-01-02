import React from "react";
import { ResumeData } from "../../types/resume";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { DraggableSection } from "../resume/DraggableSection";
import { SectionId } from "../../context/ResumeContext";
import "../../styles/CreativeModern.css";
import { ExternalLink } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  sectionOrder: SectionId[];
}

export function CreativeModern({ data, sectionOrder }: TemplateProps) {
  const { personal, experience, education, skills, languages, projects } = data;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "education":
        return education.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="section mb-8">
              <h3 className="sidebar-title">Formação</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-white">
                      {edu.institution}
                    </div>
                    <div className="text-sm text-indigo-200">{edu.degree}</div>
                    <div className="text-xs text-indigo-400 mt-1">
                      {edu.startDate} - {edu.endDate}
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
            <section className="section mb-8">
              <h3 className="sidebar-title">Idiomas</h3>
              <ul className="space-y-2">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex justify-between text-sm">
                    <span>{lang.name}</span>
                    <span className="text-indigo-300">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          </DraggableSection>
        ) : null;

      case "summary":
        return personal.summary ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="mb-10">
              <h2 className="main-title mb-4">
                <span className="title-bar"></span>
                Perfil
              </h2>
              <p className="summary-text">{personal.summary}</p>
            </section>
          </DraggableSection>
        ) : null;

      case "experience":
        return experience.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="mb-10">
              <h2 className="main-title mb-6">
                <span className="title-bar"></span>
                Experiência
              </h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="experience-item">
                    <div className="experience-dot"></div>
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {exp.position}
                      </h3>
                      <div className="experience-meta">
                        <span>{exp.company}</span>
                        <span className="experience-date">
                          {exp.startDate} -{" "}
                          {exp.current ? "Presente" : exp.endDate}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "skills":
        return skills.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="mb-10">
              <h2 className="main-title mb-6">
                <span className="title-bar"></span>
                Skills
              </h2>
              <div className="skills-container">
                {skills.map((skill) => (
                  <span key={skill.id} className="skill-chip">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </DraggableSection>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <DraggableSection key={sectionId} id={sectionId}>
            <section className="mb-10">
              <h2 className="main-title mb-6">
                <span className="title-bar"></span>
                Projetos
              </h2>
              <div className="space-y-4">
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

  const sidebarSections: SectionId[] = ["education", "languages"];
  const mainSections: SectionId[] = [
    "summary",
    "experience",
    "skills",
    "projects",
  ];

  return (
    <div className="resume-wrapper">
      <aside className="sidebar">
        <div className="profile">
          {personal.photoUrl && (
            <div className="profile-photo">
              <img src={personal.photoUrl} alt={personal.fullName} />
            </div>
          )}
          <h1>{personal.fullName}</h1>
          <p className="profile-title">{personal.title}</p>
        </div>

        <div className="space-y-8 flex-1">
          <section>
            <h3 className="sidebar-title">Contato</h3>
            <ul className="contact-list">
              {personal.email && (
                <li>
                  <Mail size={14} />
                  {personal.email}
                </li>
              )}
              {personal.phone && (
                <li>
                  <Phone size={14} />
                  {personal.phone}
                </li>
              )}
              {personal.location && (
                <li>
                  <MapPin size={14} />
                  {personal.location}
                </li>
              )}
              {personal.website && (
                <li>
                  <Globe size={14} />
                  {personal.website}
                </li>
              )}
            </ul>
          </section>

          {sectionOrder
            .filter((id) => sidebarSections.includes(id))
            .map(renderSection)}
        </div>
      </aside>

      <main className="main-content">
        {sectionOrder
          .filter((id) => mainSections.includes(id))
          .map(renderSection)}
      </main>
    </div>
  );
}
