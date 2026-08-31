import { useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import TypedText from './TypedText';

// Constantes (Mantidas fora do componente para melhor performance)
const skills = ['Desenvolvedora de Soluções Digitais', 'Desenvolvedora Full Stack', 'Node.js • NestJS • React.js', 'MySQL • PostgreSQL • Docker', 'Cloud & Deploy • APIs Seguras', 'Kanban • Scrum • Trello'];

//Curriculum - Sempre que precisar altualizar o CV altere o id do doc (infos após o download?id=...)
const CV_URL = "https://drive.google.com/uc?export=download&id=12bmNnfhRx9Gtl2pbVPyU-Baxv8FrmZ_6";

// Linhas do "código" exibido no card whoami.ts — cada uma entra com um pequeno atraso
// em relação à anterior, criando o efeito de digitação em cascata.
const whoamiLines = [
  <>
    <span className="text-brandBlue">const</span> dev = {'{'}
  </>,
  <span className="pl-4 block">
    nome: <span className="text-brandOrange">'Yaleh Nóbrega'</span>,
  </span>,
  <span className="pl-4 block">
    cargo: <span className="text-brandOrange">'Full Stack Developer'</span>,
  </span>,
  <span className="pl-4 block">
    stack: [<span className="text-brandOrange">'NestJS'</span>, <span className="text-brandOrange">'React'</span>, <span className="text-brandOrange">'TypeORM'</span>],
  </span>,
  <span className="pl-4 block">
    disponivel: <span className="text-emerald-400">true</span>
  </span>,
  <>{'}'};</>,
];

interface HeroProps {
  totalProjetos: number | null;
}

export default function Hero({ totalProjetos }: HeroProps) {
  // Lógica do Escudo Interativo: inclina o card em 3D conforme a posição do mouse
  // dentro dele. Usamos useMotionValue + useSpring (em vez de useState puro) para
  // que o movimento tenha física de mola — suave ao seguir o mouse e ao voltar
  // ao repouso, nos dois eixos (X e Y).
  const rotateXMV = useMotionValue(0);
  const rotateYMV = useMotionValue(0);
  const rotateX = useSpring(rotateXMV, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(rotateYMV, { stiffness: 150, damping: 18 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateYMV.set((x / rect.width - 0.5) * 26);
    rotateXMV.set(-(y / rect.height - 0.5) * 20);
  }

  function handleMouseLeave() {
    rotateXMV.set(0);
    rotateYMV.set(0);
  }

  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 border-b border-borderCol bg-gradient-to-b from-[#0c152a] to-darkBg">
      {/* Grade de fundo sutil, esmaecida nas bordas por uma máscara radial */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />

      {/* Blobs desfocados "flutuando" (sobem/descem + leve zoom em loop) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brandBlue/10 blur-[140px] rounded-full pointer-events-none animate-floatSlow" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-brandOrange/10 blur-[120px] rounded-full pointer-events-none animate-floatSlow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <p className="text-xl text-orange-400">Oi, eu sou</p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-light">
              Yaleh{' '}
              <span className="text-brandBlue">
                Nóbrega
              </span>
            </h1>

            <h2 className="text-lg sm:text-2xl text-slate-300 font-light min-h-[2.5rem]">
              <TypedText strings={skills} />
            </h2>

            <p className="text-lg text-white max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Transformo ideias em soluções digitais modernas, funcionais e escaláveis. Desenvolvendo aplicações reais, complexas e desafiadoras. Desde backend seguros e escaláveis até interfaces modernas e intuitivas.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projetos"
                className="px-6 py-3.5 rounded-xl bg-brandBlue text-white font-semibold shadow-lg shadow-brandBlue/20 hover:bg-sky-500 transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-code" /> Ver Projetos
              </a>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl border border-borderCol bg-cardBg hover:border-brandOrange text-slate-200 font-semibold transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-download text-brandOrange" /> Baixar CV
              </a>
            </div>

            <div className="pt-8 border-t border-borderCol grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="glass-card p-4 rounded-xl border border-borderCol">
                <span className="block text-2xl font-extrabold text-brandBlue">{totalProjetos ?? '—'}</span>
                <span className="text-xs text-slate-400 font-medium">Projetos Publicados</span>
              </div>
              <div className="glass-card p-4 rounded-xl border border-borderCol">
                <span className="block text-2xl font-extrabold text-brandOrange">100%</span>
                <span className="text-xs text-slate-400 font-medium">Cloud Integrated</span>
              </div>
              <div className="glass-card p-4 rounded-xl border border-borderCol">
                <span className="block text-2xl font-extrabold text-emerald-400">JWT</span>
                <span className="text-xs text-slate-400 font-medium">API Autenticada</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5" style={{ perspective: '1200px' }}>
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative rounded-2xl p-1 bg-gradient-to-tr from-brandBlue via-borderCol to-brandOrange shadow-2xl glow-blue"
            >
              <div className="rounded-2xl overflow-hidden bg-cardBg border border-borderCol">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-borderCol bg-darkBg/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-mono text-xs text-slate-400">whoami.ts</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2 text-slate-300">
                  {whoamiLines.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.14, duration: 0.45 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
