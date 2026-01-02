import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResumePreview } from '../components/resume/ResumePreview';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { ArrowLeft, Download, CheckCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
export function ExportPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleExport = () => {
    setIsExporting(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsExporting(false);
      setSuccess(true);
    }, 2000);
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sm:px-6 lg:px-8">
        <Link to="/generator" className="text-gray-500 hover:text-gray-900 flex items-center gap-2 font-medium">
          <ArrowLeft size={18} />
          Voltar para edição
        </Link>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Options Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Finalizar e Exportar
            </h1>

            <div className="space-y-6">
              <Select label="Tamanho da Página" options={[{
              value: 'a4',
              label: 'A4 (210 x 297 mm)'
            }, {
              value: 'letter',
              label: 'Carta (Letter)'
            }]} />

              <Select label="Idioma do Currículo" options={[{
              value: 'pt',
              label: 'Português (Brasil)'
            }, {
              value: 'en',
              label: 'English (US)'
            }, {
              value: 'es',
              label: 'Español'
            }]} />

              <div className="pt-4 border-t border-gray-100">
                {!success ? <Button size="lg" className="w-full h-12 text-lg" onClick={handleExport} isLoading={isExporting} rightIcon={<Download size={20} />}>
                    Baixar PDF
                  </Button> : <motion.div initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-2">
                      <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h3 className="font-bold text-green-800 mb-1">
                      Download Iniciado!
                    </h3>
                    <p className="text-sm text-green-600 mb-3">
                      Seu currículo foi gerado com sucesso.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSuccess(false)}>
                      Gerar Novamente
                    </Button>
                  </motion.div>}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <FileText className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">
                  Dica Profissional
                </h3>
                <p className="text-sm text-blue-700">
                  Sempre envie seu currículo em formato PDF para garantir que a
                  formatação se mantenha igual em qualquer dispositivo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 bg-gray-200 rounded-xl border border-gray-300 overflow-hidden flex items-center justify-center p-8 min-h-[500px]">
          <div className="transform scale-[0.6] origin-center shadow-2xl">
            <ResumePreview />
          </div>
        </div>
      </main>
    </div>;
}