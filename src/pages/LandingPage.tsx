import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import "../styles/LandingPage.css"
import {
  CheckCircle,
  FileText,
  Download,
  Zap,
  Layout,
  Star,
} from "lucide-react";
export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              CP
            </div>
            <span className="font-bold text-xl text-gray-900">
              CurrículoPro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/templates">
              <Button>Criar Currículo Grátis</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
          >
            Crie seu currículo profissional em{" "}
            <span className="text-blue-600">minutos</span>
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="text-xl text-gray-600 mb-8"
          >
            Escolha entre 10 modelos modernos, preencha seus dados e exporte em
            PDF. Focado em desenvolvedores e profissionais criativos.
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="flex justify-center gap-4"
          >
            <Link to="/templates">
              <Button size="lg" className="px-8 text-lg h-14">
                Começar Agora
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="px-8 text-lg h-14">
                Ver Recursos
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Hero Image / Preview */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="bg-gray-100 rounded-2xl p-4 md:p-8 shadow-2xl border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Resume Builder Interface"
              className="rounded-lg shadow-sm w-full object-cover"
            />
            {/* Floating Badges */}
            <div className="absolute -right-4 top-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm">Exportação PDF</div>
                  <div className="text-xs text-gray-500">Alta qualidade</div>
                </div>
              </div>
            </div>
            <div className="absolute -left-4 bottom-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block animate-bounce-slow-delay">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <Layout size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm">10 Modelos</div>
                  <div className="text-xs text-gray-500">Design Premium</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa ferramenta foi pensada para agilizar o processo de criação
              de currículos sem perder a qualidade visual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Editor em Tempo Real</h3>
              <p className="text-gray-600">
                Veja as alterações instantaneamente enquanto digita. Sem
                recarregar a página, sem surpresas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">
                10 Modelos Profissionais
              </h3>
              <p className="text-gray-600">
                Layouts criados por designers experientes, focados em
                legibilidade e impacto visual.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                <Download size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Exportação PDF Fácil</h3>
              <p className="text-gray-600">
                Baixe seu currículo em alta resolução, pronto para enviar para
                recrutadores ou imprimir.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Footer */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para impulsionar sua carreira?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Não perca tempo formatando documentos no Word. Use nossa ferramenta
            e foque no conteúdo.
          </p>
          <Link to="/templates">
            <Button
              size="lg"
              className="btnCriar"
            >
              Criar Meu Currículo
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2024 CurrículoPro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
