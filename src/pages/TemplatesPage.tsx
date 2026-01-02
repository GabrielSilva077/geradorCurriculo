import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useResume } from "../context/ResumeContext";
import { TemplateId } from "../types/resume";
import { Button } from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import "../styles/TemplatesPage.css";

const templates: {
  id: TemplateId;
  name: string;
  description: string;
  color: string;
  image: string;
}[] = [
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Simples, direto e elegante. Foco total no conteúdo.",
    color: "bg-gray-100",
    image: "../imgs/minimal.PNG",
  },
  {
    id: "tech-developer",
    name: "Tech Developer",
    description: "Visual inspirado em IDEs, perfeito para programadores.",
    color: "bg-slate-800",
    image: "../imgs/techdeveloper.PNG",
  },
  {
    id: "creative-modern",
    name: "Criativo Moderno",
    description: "Cores vibrantes e layout assimétrico para designers.",
    color: "bg-indigo-100",
    image: "../imgs/creative.PNG",
  },
  {
    id: "executive-classic",
    name: "Executivo Clássico",
    description: "Tradicional e confiável, ideal para cargos corporativos.",
    color: "bg-white border",
    image: "../imgs/executive.PNG",
  },
  {
    id: "dark-mode-pro",
    name: "Dark Mode Pro",
    description: "Alto contraste e modernidade com fundo escuro.",
    color: "bg-gray-900",
    image: "../imgs/dark.PNG",
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Organize sua trajetória em uma linha do tempo visual.",
    color: "bg-blue-50",
    image: "../imgs/timeline.PNG",
  },
  {
    id: "clean-sidebar",
    name: "Clean Sidebar",
    description: "Barra lateral organizada para separar informações.",
    color: "bg-slate-50",
    image: "../imgs/cleansidebar.PNG",
  },
  {
    id: "infographic",
    name: "Infográfico",
    description: "Destaque suas habilidades com gráficos visuais.",
    color: "bg-orange-50",
    image: "../imgs/infographic.PNG",
  },
  {
    id: "elegant-premium",
    name: "Elegante Premium",
    description: "Toque de luxo com detalhes dourados e serifas.",
    color: "bg-premium",
    image: "../imgs/elegantpremium.PNG",
  },
  {
    id: "compact-one-page",
    name: "Compact One Page",
    description: "Tudo em uma página. Denso e eficiente.",
    color: "bg-white border-2",
    image: "../imgs/compact.PNG",
  },
];

export function TemplatesPage() {
  const { setSelectedTemplate } = useResume();
  const navigate = useNavigate();

  const handleSelectTemplate = (id: TemplateId) => {
    setSelectedTemplate(id);
    navigate("/generator");
  };

  return (
    <div className="templates-page">
      <div className="templates-container">
        <div className="templates-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={24} />
          </Link>

          <div>
            <h1 className="title">Escolha um Modelo</h1>
            <p className="subtitle">
              Selecione o layout que melhor combina com seu perfil profissional.
            </p>
          </div>
        </div>

        <div className="templates-grid">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ y: -5 }}
              className="template-card"
            >
              <div className="template-preview group">
                <img
                  src={template.image}
                  alt={template.name}
                  className="template-image"
                />

                <div className="template-name-overlay">
                  <span>{template.name}</span>
                </div>

                <div className="template-overlay">
                  <Button onClick={() => handleSelectTemplate(template.id)}>
                    Usar este modelo
                  </Button>
                </div>
              </div>

              <div className="template-content">
                <h3>{template.name}</h3>
                <p>{template.description}</p>

                <Button
                  variant="outline"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  Selecionar
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
