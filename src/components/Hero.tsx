import { useEffect, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import TypedText from './TypedText';
import { getGithubStats, type GithubStats } from '../api/api';

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

// Conta de 0 até `target` com easing suave, uma vez que `target` deixa de ser null.
function useCountUp(target: number | null, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === null) return;
    let start: number | null = null;
    let frame: number;

    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

interface StatItemProps {
  icon: string;
  value: number | null;
  label: string;
}

// Estilo discreto: ícone pequeno em cima, número em destaque, legenda pequena embaixo.
// Sem card/borda — só espaçamento, como na referência.
function StatItem({ icon, value, label }: StatItemProps) {
  const count = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <i className={`${icon} text-brandBlue text-base`} />
      <span className="text-2xl font-extrabold text-white tabular-nums">
        {value === null ? '—' : count.toLocaleString('pt-BR')}
      </span>
      <span className="text-xs text-slate-400 font-medium">{label}</span>
    </div>
  );
}

export default function Hero() {
  const [stats, setStats] = useState<GithubStats | null>(null);

  useEffect(() => {
    getGithubStats()
      .then((res) => setStats(res.data))
      .catch(() => setStats(null));
  }, []);

  // Parallax de scroll: quanto mais a página rola, mais os blobs sobem (blobY)
  // e o conteúdo do Hero sobe + desaparece (contentY / contentOpacity).
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 700], [0, 180]);
  const contentY = useTransform(scrollY, [0, 700], [0, 90]);
  const contentOpacity = useTransform(scrollY, [0, 550], [1, 0]);

  // Tilt 3D do card whoami.ts, com física de mola nos dois eixos.
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
    <section className="relative overflow-hidden pt-48 pb-24 lg:pt-56 lg:pb-32 border-b border-borderCol bg-gradient-to-b from-[#0c152a] to-darkBg">
      {/* Grade de fundo sutil, esmaecida nas bordas por uma máscara radial */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />

      {/* Blobs desfocados: o div externo (motion) recebe o parallax do scroll;
          o div interno recebe o "float" contínuo via CSS @keyframes. */}
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute top-1/4 left-1/2 -ml-[300px] -mt-[175px]"
      >
        <div className="w-[600px] h-[350px] bg-brandBlue/10 blur-[140px] rounded-full animate-floatSlow" />
      </motion.div>
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute top-1/3 right-10"
      >
        <div className="w-[350px] h-[350px] bg-brandOrange/10 blur-[120px] rounded-full animate-floatSlow" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <p className="lg:text-2xl text-orange-400">Oi, eu sou</p>

            <h1 className="text-white">
              Yaleh{' '}
              <span className="text-gradient">
                Nóbrega
              </span>
            </h1>

            <div className="w-127 h-[2px] mx-auto lg:mx-0 divider-gradient" />

            <h2 className="text-lg sm:text-2xl font-light min-h-[2.5rem] text-gradient font-mono">
              <TypedText strings={skills} />
            </h2>

            <p className="text-lg text-white max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed mt-6">
              Transformo ideias em soluções digitais modernas, funcionais e escaláveis. Desenvolvendo aplicações reais, complexas e desafiadoras. Desde backend seguros e escaláveis até interfaces modernas e intuitivas.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-10">
              <a
                href="#projetos"
                className="px-6 py-3.5 rounded-xl bg-brandBlue text-white text-base font-semibold shadow-lg shadow-brandBlue/20 hover:bg-sky-500 transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-code" /> Ver Projetos
              </a>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl border border-borderCol bg-cardBg hover:border-brandOrange text-slate-200 text-base font-semibold transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-download text-brandOrange" /> Baixar CV
              </a>
            </div>

            {/* Linha separadora — margem de cima e de baixo controladas independentemente */}
            <div className="mt-12 mb-6 h-px bg-borderCol" />

            {/* Stats vindos do GitHub — estilo discreto, sem card/borda */}
            <div className="flex flex-wrap items-start justify-center lg:justify-start gap-10 mt-12">
              <StatItem icon="fa-solid fa-diagram-project" value={stats?.totalRepos ?? null} label="Projetos Publicados" />
              <StatItem icon="fa-solid fa-code-commit" value={stats?.totalCommits ?? null} label="Commits" />
              <StatItem icon="fa-solid fa-mug-hot" value={stats?.coffees ?? null} label="Copos de Café" />
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
      </motion.div>
    </section>
  );
}
