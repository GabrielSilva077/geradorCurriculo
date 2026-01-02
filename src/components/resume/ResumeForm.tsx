import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Card } from '../ui/Card';
import { Plus, Trash2, ChevronDown, ChevronUp, User, Briefcase, GraduationCap, Code, Globe, FolderGit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function ResumeForm() {
  const {
    resumeData,
    updatePersonalData,
    addExperience,
    removeExperience,
    updateExperience,
    addEducation,
    removeEducation,
    updateEducation,
    addSkill,
    removeSkill,
    updateSkill,
    addProject,
    removeProject,
    updateProject
  } = useResume();
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  return <div className="space-y-6 pb-20">
      {/* Personal Data */}
      <Card className="border-l-4 border-l-blue-500">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('personal')}>
          <div className="flex items-center gap-2">
            <User className="text-blue-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Dados Pessoais</h2>
          </div>
          {expandedSection === 'personal' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        <AnimatePresence>
          {expandedSection === 'personal' && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Input label="Nome Completo" value={resumeData.personal.fullName} onChange={e => updatePersonalData('fullName', e.target.value)} placeholder="Ex: João Silva" />
                <Input label="Cargo / Título" value={resumeData.personal.title} onChange={e => updatePersonalData('title', e.target.value)} placeholder="Ex: Senior Frontend Developer" />
                <Input label="Email" value={resumeData.personal.email} onChange={e => updatePersonalData('email', e.target.value)} placeholder="email@exemplo.com" />
                <Input label="Telefone" value={resumeData.personal.phone} onChange={e => updatePersonalData('phone', e.target.value)} placeholder="(11) 99999-9999" />
                <Input label="Localização" value={resumeData.personal.location} onChange={e => updatePersonalData('location', e.target.value)} placeholder="São Paulo, SP" />
                <Input label="Foto URL (Opcional)" value={resumeData.personal.photoUrl || ''} onChange={e => updatePersonalData('photoUrl', e.target.value)} placeholder="https://..." />
                <Input label="LinkedIn" value={resumeData.personal.linkedin} onChange={e => updatePersonalData('linkedin', e.target.value)} placeholder="linkedin.com/in/..." />
                <Input label="GitHub" value={resumeData.personal.github} onChange={e => updatePersonalData('github', e.target.value)} placeholder="github.com/..." />
                <Input label="Site / Portfólio" value={resumeData.personal.website} onChange={e => updatePersonalData('website', e.target.value)} placeholder="meusite.com" />
                <div className="md:col-span-2">
                  <Textarea label="Resumo Profissional" value={resumeData.personal.summary} onChange={e => updatePersonalData('summary', e.target.value)} placeholder="Breve descrição sobre sua carreira e objetivos..." rows={4} />
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </Card>

      {/* Experience */}
      <Card className="border-l-4 border-l-purple-500">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('experience')}>
          <div className="flex items-center gap-2">
            <Briefcase className="text-purple-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800">
              Experiência Profissional
            </h2>
          </div>
          {expandedSection === 'experience' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        <AnimatePresence>
          {expandedSection === 'experience' && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} className="overflow-hidden">
              <div className="mt-6 space-y-6">
                {resumeData.experience.map((exp, index) => <div key={exp.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                    <h3 className="text-sm font-bold text-gray-500 mb-3">
                      Experiência #{index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Empresa" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                      <Input label="Cargo" value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} />
                      <Input label="Início" type="text" placeholder="MM/AAAA" value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} />
                      <div className="flex gap-2 items-end">
                        <Input label="Fim" type="text" placeholder="MM/AAAA" value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} disabled={exp.current} />
                        <div className="pb-3 flex items-center">
                          <input type="checkbox" id={`current-${exp.id}`} checked={exp.current} onChange={e => updateExperience(exp.id, 'current', e.target.checked)} className="mr-2" />
                          <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-600">
                            Atual
                          </label>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Textarea label="Descrição" value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} rows={3} />
                      </div>
                    </div>
                  </div>)}
                <Button variant="outline" onClick={addExperience} leftIcon={<Plus size={16} />} className="w-full">
                  Adicionar Experiência
                </Button>
              </div>
            </motion.div>}
        </AnimatePresence>
      </Card>

      {/* Education */}
      <Card className="border-l-4 border-l-green-500">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('education')}>
          <div className="flex items-center gap-2">
            <GraduationCap className="text-green-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800">
              Formação Acadêmica
            </h2>
          </div>
          {expandedSection === 'education' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        <AnimatePresence>
          {expandedSection === 'education' && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} className="overflow-hidden">
              <div className="mt-6 space-y-6">
                {resumeData.education.map((edu, index) => <div key={edu.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
                    <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                    <h3 className="text-sm font-bold text-gray-500 mb-3">
                      Formação #{index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Instituição" value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} />
                      <Input label="Grau / Curso" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                      <Input label="Início" value={edu.startDate} onChange={e => updateEducation(edu.id, 'startDate', e.target.value)} />
                      <Input label="Fim" value={edu.endDate} onChange={e => updateEducation(edu.id, 'endDate', e.target.value)} />
                    </div>
                  </div>)}
                <Button variant="outline" onClick={addEducation} leftIcon={<Plus size={16} />} className="w-full">
                  Adicionar Formação
                </Button>
              </div>
            </motion.div>}
        </AnimatePresence>
      </Card>

      {/* Skills */}
      <Card className="border-l-4 border-l-orange-500">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('skills')}>
          <div className="flex items-center gap-2">
            <Code className="text-orange-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Habilidades</h2>
          </div>
          {expandedSection === 'skills' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        <AnimatePresence>
          {expandedSection === 'skills' && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} className="overflow-hidden">
              <div className="mt-6 space-y-4">
                {resumeData.skills.map(skill => <div key={skill.id} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Input placeholder="Ex: React, Photoshop, Liderança" value={skill.name} onChange={e => updateSkill(skill.id, 'name', e.target.value)} />
                    </div>
                    <div className="w-1/3">
                      <Select options={[{
                  value: 'Iniciante',
                  label: 'Iniciante'
                }, {
                  value: 'Intermediário',
                  label: 'Intermediário'
                }, {
                  value: 'Avançado',
                  label: 'Avançado'
                }, {
                  value: 'Especialista',
                  label: 'Especialista'
                }]} value={skill.level} onChange={e => updateSkill(skill.id, 'level', e.target.value)} />
                    </div>
                    <button onClick={() => removeSkill(skill.id)} className="mb-2 text-gray-400 hover:text-red-500 p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>)}
                <Button variant="outline" onClick={addSkill} leftIcon={<Plus size={16} />} className="w-full">
                  Adicionar Habilidade
                </Button>
              </div>
            </motion.div>}
        </AnimatePresence>
      </Card>

      {/* Projects */}
      <Card className="border-l-4 border-l-pink-500">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('projects')}>
          <div className="flex items-center gap-2">
            <FolderGit2 className="text-pink-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Projetos</h2>
          </div>
          {expandedSection === 'projects' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        <AnimatePresence>
          {expandedSection === 'projects' && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} className="overflow-hidden">
              <div className="mt-6 space-y-6">
                {resumeData.projects.map((proj, index) => <div key={proj.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
                    <button onClick={() => removeProject(proj.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                    <h3 className="text-sm font-bold text-gray-500 mb-3">
                      Projeto #{index + 1}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <Input label="Nome do Projeto" value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} />
                      <Input label="Link (Opcional)" value={proj.link} onChange={e => updateProject(proj.id, 'link', e.target.value)} />
                      <Textarea label="Descrição" value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} rows={2} />
                    </div>
                  </div>)}
                <Button variant="outline" onClick={addProject} leftIcon={<Plus size={16} />} className="w-full">
                  Adicionar Projeto
                </Button>
              </div>
            </motion.div>}
        </AnimatePresence>
      </Card>
    </div>;
}