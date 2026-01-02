export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}
export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}
export interface Skill {
  id: string;
  name: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
}
export interface Language {
  id: string;
  name: string;
  level: 'Básico' | 'Intermediário' | 'Fluente' | 'Nativo';
}
export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}
export interface ResumeData {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
    photoUrl?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
}
export type TemplateId = 'minimal-clean' | 'tech-developer' | 'creative-modern' | 'executive-classic' | 'dark-mode-pro' | 'timeline' | 'clean-sidebar' | 'infographic' | 'elegant-premium' | 'compact-one-page';
export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail: string;
}