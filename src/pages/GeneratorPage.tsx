import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ResumeForm } from '../components/resume/ResumeForm';
import { ResumePreview } from '../components/resume/ResumePreview';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Download, Eye, Edit3 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
export function GeneratorPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const {
    selectedTemplate
  } = useResume();
  const navigate = useNavigate();
  return <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/templates" className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Mudar Modelo</span>
          </Link>
          <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
          <span className="text-sm font-bold text-gray-700 capitalize hidden sm:inline">
            {selectedTemplate.replace('-', ' ')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-lg md:hidden">
            <button onClick={() => setActiveTab('form')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'form' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}>
              <Edit3 size={14} className="inline mr-1" /> Editar
            </button>
            <button onClick={() => setActiveTab('preview')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'preview' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}>
              <Eye size={14} className="inline mr-1" /> Visualizar
            </button>
          </div>

          <Button onClick={() => navigate('/export')} rightIcon={<Download size={16} />} size="sm">
            Exportar PDF
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Form (Scrollable) */}
        <div className={`
          w-full md:w-[40%] lg:w-[35%] bg-white border-r border-gray-200 overflow-y-auto
          ${activeTab === 'form' ? 'block' : 'hidden md:block'}
        `}>
          <div className="p-6 max-w-2xl mx-auto">
            <ResumeForm />
          </div>
        </div>

        {/* Right: Preview (Scrollable container, centered content) */}
        <div className={`
          w-full md:w-[60%] lg:w-[65%] bg-gray-100 overflow-hidden relative
          ${activeTab === 'preview' ? 'block' : 'hidden md:block'}
        `}>
          <ResumePreview />
        </div>
      </div>
    </div>;
}