import React, { useState } from "react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { ResumePreview } from "../components/resume/ResumePreview";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { ArrowLeft, Download, CheckCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/ExportPage.css";

export function ExportPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  // 👉 NOVOS ESTADOS
  const [language, setLanguage] = useState<"pt" | "en" | "es">("pt");
  const [pageSize, setPageSize] = useState<"a4" | "letter">("a4");

  const handleExport = async () => {
    const element = document.getElementById("resume-to-pdf");
    if (!element) return;

    setIsExporting(true);
    setSuccess(false);

    const options = {
      margin: 0,
      filename: "curriculo.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: pageSize, // 👉 usa o tamanho selecionado
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["avoid-all"],
      },
    };

    try {
      await html2pdf().set(options).from(element).save();
      setSuccess(true);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="export-page">
      <header className="export-header">
        <Link to="/generator" className="back-link">
          <ArrowLeft size={18} />
          Voltar para edição
        </Link>
      </header>

      <main className="export-main">
        {/* Painel esquerdo */}
        <section className="options-panel">
          <div className="card">
            <h1 className="title">Finalizar e Exportar</h1>

            <div className="form-group">
              <Select
                label="Tamanho da Página"
                value={pageSize}
                onChange={(value: "a4" | "letter") => setPageSize(value)}
                options={[
                  { value: "a4", label: "A4 (210 x 297 mm)" },
                  { value: "letter", label: "Carta (Letter)" },
                ]}
              />

              <Select
                label="Idioma do Currículo"
                value={language}
                onChange={(value: "pt" | "en" | "es") => setLanguage(value)}
                options={[
                  { value: "pt", label: "Português (Brasil)" },
                  { value: "en", label: "English (US)" },
                  { value: "es", label: "Español" },
                ]}
              />

              <div className="action-area">
                {!success ? (
                  <Button
                    size="lg"
                    className="download-button"
                    onClick={handleExport}
                    isLoading={isExporting}
                    rightIcon={<Download size={20} />}
                  >
                    Baixar PDF
                  </Button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="success-box"
                  >
                    <CheckCircle size={32} />
                    <h3>Download Iniciado!</h3>
                    <p>Seu currículo foi gerado com sucesso.</p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSuccess(false)}
                    >
                      Gerar Novamente
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="tip-box">
            <FileText size={24} />
            <div>
              <h3>Dica Profissional</h3>
              <p>
                Sempre envie seu currículo em formato PDF para garantir que a
                formatação se mantenha igual em qualquer dispositivo.
              </p>
            </div>
          </div>
        </section>

        {/* Preview */}
        <section id="resume-to-pdf" className="preview-panel">
          <ResumePreview
            language={language}
            pageSize={pageSize}
          />
        </section>
      </main>
    </div>
  );
}
