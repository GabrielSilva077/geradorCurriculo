import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode
} from 'react';
import { ResumeData, TemplateId } from '../types/resume';

/* ============================
   TYPES
============================ */

export type SectionId =
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'projects';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;

  selectedTemplate: TemplateId;
  setSelectedTemplate: (id: TemplateId) => void;

  sectionOrder: SectionId[];
  updateSectionOrder: (newOrder: SectionId[]) => void;

  updatePersonalData: (
    field: keyof ResumeData['personal'],
    value: string
  ) => void;

  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, field: keyof any, value: any) => void;

  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, field: keyof any, value: any) => void;

  addSkill: () => void;
  removeSkill: (id: string) => void;
  updateSkill: (id: string, field: keyof any, value: any) => void;

  addProject: () => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, field: keyof any, value: any) => void;
}

/* ============================
   INITIAL DATA
============================ */

const initialResumeData: ResumeData = {
  personal: {
    fullName: 'Seu Nome',
    title: 'Senior Frontend Developer',
    email: 'seu.nome@email.com',
    phone: '(11) 99999-9999',
    location: 'São Paulo, SP',
    website: 'seunome.dev',
    linkedin: 'linkedin.com/in/seunome',
    github: 'github.com/seunome',
    summary:
      'Desenvolvedor apaixonado por criar experiências web incríveis. Especialista em React, TypeScript e UI Design. Focado em performance e acessibilidade.',
    photoUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Engineer',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description:
        'Liderança técnica do time de frontend, implementação de design system e migração para Next.js.'
    },
    {
      id: '2',
      company: 'Creative Agency',
      position: 'Frontend Developer',
      startDate: '2019-01',
      endDate: '2021-02',
      current: false,
      description:
        'Desenvolvimento de landing pages de alta conversão e aplicações web interativas para clientes globais.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Universidade de Tecnologia',
      degree: 'Bacharelado em Ciência da Computação',
      startDate: '2015',
      endDate: '2019',
      current: false,
      description:
        'Foco em Engenharia de Software e Interação Humano-Computador.'
    }
  ],
  skills: [
    { id: '1', name: 'React', level: 'Especialista' },
    { id: '2', name: 'TypeScript', level: 'Avançado' },
    { id: '3', name: 'Node.js', level: 'Intermediário' },
    { id: '4', name: 'UI/UX Design', level: 'Avançado' }
  ],
  languages: [
    { id: '1', name: 'Português', level: 'Nativo' },
    { id: '2', name: 'Inglês', level: 'Fluente' }
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Dashboard',
      description:
        'Painel administrativo completo com gráficos em tempo real e gestão de estoque.',
      link: 'github.com/seunome/dashboard'
    }
  ]
};

const defaultSectionOrder: SectionId[] = [
  'experience',
  'education',
  'skills',
  'languages',
  'projects'
];

/* ============================
   CONTEXT
============================ */

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

/* ============================
   PROVIDER
============================ */

export function ResumeProvider({ children }: { children: ReactNode }) {
  /* ---------- Resume Data ---------- */
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : initialResumeData;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  /* ---------- Template ---------- */
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(() => {
    return (
      (localStorage.getItem('selectedTemplate') as TemplateId) ||
      'minimal-clean'
    );
  });

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  /* ---------- Section Order ---------- */
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>(() => {
    const saved = localStorage.getItem('sectionOrder');
    return saved ? JSON.parse(saved) : defaultSectionOrder;
  });

  useEffect(() => {
    localStorage.setItem('sectionOrder', JSON.stringify(sectionOrder));
  }, [sectionOrder]);

  const updateSectionOrder = (newOrder: SectionId[]) => {
    setSectionOrder(newOrder);
  };

  /* ---------- Personal Data ---------- */
  const updatePersonalData = (
    field: keyof ResumeData['personal'],
    value: string
  ) => {
    setResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  /* ---------- Generic Helpers ---------- */
  const addItem = <T extends { id: string }>(
    key: keyof ResumeData,
    newItem: T
  ) => {
    setResumeData(prev => ({
      ...prev,
      [key]: [...(prev[key] as T[]), newItem]
    }));
  };

  const removeItem = (key: keyof ResumeData, id: string) => {
    setResumeData(prev => ({
      ...prev,
      [key]: (prev[key] as any[]).filter(item => item.id !== id)
    }));
  };

  const updateItem = (
    key: keyof ResumeData,
    id: string,
    field: string,
    value: any
  ) => {
    setResumeData(prev => ({
      ...prev,
      [key]: (prev[key] as any[]).map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  /* ---------- CRUD ---------- */
  const addExperience = () =>
    addItem('experience', {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });

  const addEducation = () =>
    addItem('education', {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });

  const addSkill = () =>
    addItem('skills', {
      id: Date.now().toString(),
      name: '',
      level: 'Iniciante'
    });

  const addProject = () =>
    addItem('projects', {
      id: Date.now().toString(),
      name: '',
      description: '',
      link: ''
    });

  /* ---------- PROVIDER ---------- */
  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        selectedTemplate,
        setSelectedTemplate,
        sectionOrder,
        updateSectionOrder,
        updatePersonalData,
        addExperience,
        removeExperience: id => removeItem('experience', id),
        updateExperience: (id, field, value) =>
          updateItem('experience', id, field as string, value),
        addEducation,
        removeEducation: id => removeItem('education', id),
        updateEducation: (id, field, value) =>
          updateItem('education', id, field as string, value),
        addSkill,
        removeSkill: id => removeItem('skills', id),
        updateSkill: (id, field, value) =>
          updateItem('skills', id, field as string, value),
        addProject,
        removeProject: id => removeItem('projects', id),
        updateProject: (id, field, value) =>
          updateItem('projects', id, field as string, value)
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

/* ============================
   HOOK
============================ */

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
