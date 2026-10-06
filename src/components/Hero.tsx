// import { useEffect, useState } from 'react';
// import { motion, useReducedMotion } from 'motion/react';
// import { FiArrowDown, FiArrowUpRight, FiCoffee, FiFolder, FiGitCommit } from 'react-icons/fi';
// import { getGithubStats, type GithubStats } from '../api/api';

// const CV_URL = 'https://drive.google.com/uc?export=download&id=12bmNnfhRx9Gtl2pbVPyU-Baxv8FrmZ_6';
// const skills = ['React', 'TypeScript', 'Node.js', 'Cloud & APIs'];

// const reveal = {
//   hidden: { opacity: 0, y: 18 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
// };

// function Stat({ icon: Icon, value, label }: { icon: typeof FiFolder; value: number | null; label: string }) {
//   return (
//     <div className="flex items-center gap-2.5 sm:gap-3">
//       <Icon aria-hidden="true" className="h-4 w-4 text-brandOrange" />
//       <div>
//         <p className="font-display text-xl font-semibold leading-none tabular-nums text-white sm:text-2xl">
//           {value === null ? '—' : value.toLocaleString('pt-BR')}
//         </p>
//         <p className="mt-1.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">{label}</p>
//       </div>
//     </div>
//   );
// }

// export default function Hero() {
//   const [stats, setStats] = useState<GithubStats | null>(null);
//   const [time, setTime] = useState('--:--');
//   const reduceMotion = useReducedMotion();

//   useEffect(() => {
//     getGithubStats().then(({ data }) => setStats(data)).catch(() => setStats(null));
//     const updateTime = () => setTime(new Intl.DateTimeFormat('pt-BR', {
//       timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false,
//     }).format(new Date()));
//     updateTime();
//     const timer = window.setInterval(updateTime, 60_000);
//     return () => window.clearInterval(timer);
//   }, []);

//   return (
//     <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-borderCol bg-darkBg px-5 pb-20 pt-24 sm:px-8 sm:pb-24 lg:px-12 lg:pt-28">
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
//         <div className="absolute -left-40 top-[30%] h-[26rem] w-[26rem] rounded-full bg-brandBlue/10 blur-[140px]" />
//         <div className="absolute -right-48 top-[38%] h-[32rem] w-[32rem] rounded-full bg-brandOrange/10 blur-[150px]" />
//       </div>

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.12 } } }}
//         className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col"
//       >
//         <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:text-[10px]">
//           <motion.a variants={reveal} href="#inicio" aria-label="YN, início" className="font-display text-base font-bold tracking-tight text-white">YN<span className="text-brandOrange">.</span></motion.a>
//           <motion.span variants={reveal} className="hidden sm:inline">Portfólio · 2026</motion.span>
//           <motion.a variants={reveal} href="#contato" className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-slate-200 transition-colors hover:border-brandBlue hover:text-brandBlue sm:px-4">
//             Vamos conversar <FiArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//           </motion.a>
//         </div>

//         <div className="grid flex-1 grid-cols-1 content-center gap-12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-10">
//           <div className="lg:col-span-7">
//             <motion.div variants={reveal} className="mb-5 flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:mb-7 sm:text-[10px]">
//               <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
//               Aberta a novas oportunidades
//             </motion.div>
//             <motion.h1 variants={reveal} className="font-display text-[clamp(3.5rem,9.3vw,9rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
//               Desenvolvedora<br />
//               <span className="text-brandBlue">Full Stack</span>
//             </motion.h1>
//             <motion.div variants={reveal} className="mt-7 flex flex-wrap gap-2 sm:mt-8">
//               {skills.map((skill) => <span key={skill} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-300 sm:text-[10px]">{skill}</span>)}
//             </motion.div>
//           </div>

//           <motion.div variants={reveal} className="flex flex-col justify-center lg:col-span-5 lg:items-end lg:pt-14">
//             <p className="mb-5 max-w-xs font-mono text-[10px] uppercase leading-[1.8] tracking-[0.15em] text-slate-400 lg:text-right">
//               Construindo produtos digitais úteis, acessíveis e prontos para crescer.
//             </p>
//             <h2 className="font-display text-6xl font-bold uppercase leading-[0.82] tracking-[-0.075em] text-white sm:text-7xl lg:text-right xl:text-8xl">
//               Yaleh<br />Nóbrega<span className="text-brandOrange">.</span>
//             </h2>
//             <div className="mt-6 flex w-full max-w-sm items-center justify-between border-t border-white/15 pt-3 font-mono text-[9px] uppercase tracking-[0.17em] text-slate-500 lg:self-end">
//               <span>Brasil · Desenvolvedora</span><span>{time}</span>
//             </div>
//             <div className="mt-6 flex w-full max-w-sm gap-3 lg:justify-end">
//               <a href="#projetos" className="group inline-flex items-center gap-2 rounded-full bg-brandBlue px-4 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-darkBg transition-colors hover:bg-sky-300 sm:text-[10px]">
//                 Ver projetos <FiArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//               </a>
//               <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-200 transition-colors hover:border-brandOrange hover:text-brandOrange sm:text-[10px]">
//                 Currículo <FiArrowUpRight className="h-3.5 w-3.5" />
//               </a>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div variants={reveal} className="relative grid grid-cols-1 gap-6 border-t border-white/15 pt-5 sm:grid-cols-[1fr_auto] sm:items-end lg:pt-6">
//           <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8 lg:gap-x-10">
//             <Stat icon={FiFolder} value={stats?.totalRepos ?? null} label="Projetos publicados" />
//             <Stat icon={FiGitCommit} value={stats?.totalCommits ?? null} label="Commits" />
//             <Stat icon={FiCoffee} value={stats?.coffees ?? null} label="Copos de café" />
//           </div>
//           <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:block">Feito com intenção · YN</span>
//         </motion.div>
//       </motion.div>

//       <a href="#sobre" aria-label="Role para conhecer mais" className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-white sm:bottom-8">
//         <span>Scroll down</span>
//         <motion.span animate={reduceMotion ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-brandBlue group-hover:border-brandBlue">
//           <FiArrowDown className="h-3.5 w-3.5" />
//         </motion.span>
//       </a>
//     </section>
//   );
// }
// import { useEffect, useState } from 'react';
// import { motion, useReducedMotion } from 'motion/react';
// import { FiArrowDown, FiArrowUpRight, FiCoffee, FiFolder, FiGitCommit } from 'react-icons/fi';
// import { getGithubStats, type GithubStats } from '../api/api';

// const CV_URL = 'https://drive.google.com/uc?export=download&id=12bmNnfhRx9Gtl2pbVPyU-Baxv8FrmZ_6';
// const skills = ['React', 'TypeScript', 'Node.js', 'Cloud & APIs'];

// const reveal = {
//   hidden: { opacity: 0, y: 18 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
// };

// function Stat({ icon: Icon, value, label }: { icon: typeof FiFolder; value: number | null; label: string }) {
//   return (
//     <div className="flex items-center gap-2.5 sm:gap-3">
//       <Icon aria-hidden="true" className="h-4 w-4 text-brandOrange" />
//       <div>
//         <p className="font-display text-xl font-semibold leading-none tabular-nums text-white sm:text-2xl">
//           {value === null ? '—' : value.toLocaleString('pt-BR')}
//         </p>
//         <p className="mt-1.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">{label}</p>
//       </div>
//     </div>
//   );
// }

// export default function Hero() {
//   const [stats, setStats] = useState<GithubStats | null>(null);
//   const [time, setTime] = useState('--:--');
//   const reduceMotion = useReducedMotion();

//   useEffect(() => {
//     getGithubStats().then(({ data }) => setStats(data)).catch(() => setStats(null));
//     const updateTime = () => setTime(new Intl.DateTimeFormat('pt-BR', {
//       timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false,
//     }).format(new Date()));
//     updateTime();
//     const timer = window.setInterval(updateTime, 60_000);
//     return () => window.clearInterval(timer);
//   }, []);

//   return (
//     <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-borderCol bg-darkBg px-5 pb-20 pt-24 sm:px-8 sm:pb-24 lg:px-12 lg:pt-28">
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
//         <div className="absolute -left-40 top-[30%] h-[26rem] w-[26rem] rounded-full bg-brandBlue/10 blur-[140px]" />
//         <div className="absolute -right-48 top-[38%] h-[32rem] w-[32rem] rounded-full bg-brandOrange/10 blur-[150px]" />
//       </div>

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.12 } } }}
//         className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col"
//       >
//         <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:text-[10px]">
//           <motion.a variants={reveal} href="#inicio" aria-label="YN, início" className="font-display text-base font-bold tracking-tight text-white">YN<span className="text-brandOrange">.</span></motion.a>
//           <motion.span variants={reveal} className="hidden sm:inline">Portfólio · 2026</motion.span>
//           <motion.a variants={reveal} href="#contato" className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-slate-200 transition-colors hover:border-brandBlue hover:text-brandBlue sm:px-4">
//             Vamos conversar <FiArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//           </motion.a>
//         </div>

//         <div className="grid flex-1 grid-cols-1 content-center gap-12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-10">
//           <div className="lg:col-span-7">
//             <motion.div variants={reveal} className="mb-5 flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:mb-7 sm:text-[10px]">
//               <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
//               Aberta a novas oportunidades
//             </motion.div>
//             <motion.h1 variants={reveal} className="font-display text-[clamp(3.5rem,9.3vw,9rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
//               Desenvolvedora<br />
//               <span className="text-brandBlue">Full Stack</span>
//             </motion.h1>
//             <motion.div variants={reveal} className="mt-7 flex flex-wrap gap-2 sm:mt-8">
//               {skills.map((skill) => <span key={skill} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-300 sm:text-[10px]">{skill}</span>)}
//             </motion.div>
//           </div>

//           <motion.div variants={reveal} className="flex flex-col justify-center lg:col-span-5 lg:items-end lg:pt-14">
//             <p className="mb-5 max-w-xs font-mono text-[10px] uppercase leading-[1.8] tracking-[0.15em] text-slate-400 lg:text-right">
//               Construindo produtos digitais úteis, acessíveis e prontos para crescer.
//             </p>
//             <h2 className="font-display text-6xl font-bold uppercase leading-[0.82] tracking-[-0.075em] text-white sm:text-7xl lg:text-right xl:text-8xl">
//               Yaleh<br />Nóbrega<span className="text-brandOrange">.</span>
//             </h2>
//             <div className="mt-6 flex w-full max-w-sm items-center justify-between border-t border-white/15 pt-3 font-mono text-[9px] uppercase tracking-[0.17em] text-slate-500 lg:self-end">
//               <span>Brasil · Desenvolvedora</span><span>{time}</span>
//             </div>
//             <div className="mt-6 flex w-full max-w-sm gap-3 lg:justify-end">
//               <a href="#projetos" className="group inline-flex items-center gap-2 rounded-full bg-brandBlue px-4 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-darkBg transition-colors hover:bg-sky-300 sm:text-[10px]">
//                 Ver projetos <FiArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//               </a>
//               <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-200 transition-colors hover:border-brandOrange hover:text-brandOrange sm:text-[10px]">
//                 Currículo <FiArrowUpRight className="h-3.5 w-3.5" />
//               </a>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div variants={reveal} className="relative grid grid-cols-1 gap-6 border-t border-white/15 pt-5 sm:grid-cols-[1fr_auto] sm:items-end lg:pt-6">
//           <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8 lg:gap-x-10">
//             <Stat icon={FiFolder} value={stats?.totalRepos ?? null} label="Projetos publicados" />
//             <Stat icon={FiGitCommit} value={stats?.totalCommits ?? null} label="Commits" />
//             <Stat icon={FiCoffee} value={stats?.coffees ?? null} label="Copos de café" />
//           </div>
//           <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:block">Feito com intenção · YN</span>
//         </motion.div>
//       </motion.div>

//       <a href="#sobre" aria-label="Role para conhecer mais" className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-white sm:bottom-8">
//         <span>Scroll down</span>
//         <motion.span animate={reduceMotion ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-brandBlue group-hover:border-brandBlue">
//           <FiArrowDown className="h-3.5 w-3.5" />
//         </motion.span>
//       </a>
//     </section>
//   );
// }

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FiArrowDown, FiArrowUpRight, FiCoffee, FiFolder, FiGitCommit } from 'react-icons/fi';
import { getGithubStats, type GithubStats } from '../api/api';
import TypedText from './TypedText';

const heroTitleLines = [
  { text: 'Desenvolvedora' },
  { text: 'Full Stack', className: 'text-brandBlue' },
];

const CV_URL = 'https://drive.google.com/uc?export=download&id=1MF0qRfH6LaewZPGdZYsYiCai0Sqe-6qd';
const skills = ['React', 'TypeScript', 'Node.js', 'Cloud & APIs'];

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof FiFolder;
  value: number | null;
  label: string;
}) {
  return (
    <div className="flex min-w-32 flex-col items-center gap-0.5 text-center">
      <Icon
        aria-hidden="true"
        className="h-5 w-5 text-brandOrange"
      />

      <p className="font-display text-xl font-semibold tabular-nums text-white sm:text-2xl">
        {value === null ? '—' : value.toLocaleString('pt-BR')}
      </p>

      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400 sm:text-[10px]">
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [time, setTime] = useState('--:--');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    getGithubStats().then(({ data }) => setStats(data)).catch(() => setStats(null));
    const updateTime = () => setTime(
      new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
        .format(new Date())
        .replace('.', '')
        .toLocaleUpperCase('pt-BR'),
    );
    updateTime();
    const timer = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-borderCol bg-darkBg px-5 pb-20 pt-24 sm:px-8 sm:pb-24 lg:px-12 lg:pt-28">
      {/* <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="absolute -left-40 top-[30%] h-[26rem] w-[26rem] rounded-full bg-brandBlue/10 blur-[140px]" />
        <div className="absolute -right-48 top-[38%] h-[32rem] w-[32rem] rounded-full bg-brandOrange/10 blur-[150px]" />
      </div> */}
<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
  {/* Grade sutil */}
<div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(148,163,184,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.10)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

  {/* Brilho azul */}
  <div className="absolute -left-48 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brandBlue/10 blur-[140px]" />

  {/* Brilho laranja */}
  <div className="absolute -right-48 bottom-0 h-[32rem] w-[32rem] rounded-full bg-brandOrange/10 blur-[150px]" />
</div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.12 } } }}
        className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col"
      >
        <div className="flex items-center justify-end font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:text-[10px]">
          <motion.a variants={reveal} href="#contato" className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-slate-200 transition-colors hover:border-brandBlue hover:text-brandBlue sm:px-4">
            Vamos conversar <FiArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <div className="grid flex-1 grid-cols-1 item-start gap-12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-10">
          <div className="lg:col-span-7 items-start justify-start">
            <motion.div variants={reveal} className="mb-5 flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:mb-7 sm:text-[10px]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              Aberta a novas oportunidades
            </motion.div>
            <motion.h1 aria-label="Desenvolvedora Full Stack" variants={reveal} className="font-display text-[clamp(3.5rem,9.3vw,9rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
              <TypedText lines={heroTitleLines} typingSpeed={120} erasingSpeed={85} holdDuration={3000} restartDelay={3000} />
            </motion.h1>
            <motion.div variants={reveal} className="mt-7 flex flex-wrap gap-2 sm:mt-8">
              {skills.map((skill) => <span key={skill} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-300 sm:text-[10px]">{skill}</span>)}
            </motion.div>
          </div>

          <motion.div variants={reveal} className="flex flex-col justify-end lg:col-span-5 lg:items-end lg:self-end lg:pt-14">
            <p className="mb-5 max-w-xs font-mono text-[10px] uppercase leading-[1.8] tracking-[0.15em] text-slate-400 lg:text-right">
              Construindo produtos digitais úteis, acessíveis e prontos para crescer.
            </p>
            <h2 className="font-display text-6xl font-bold uppercase leading-[0.82] tracking-[-0.075em] text-white sm:text-7xl lg:text-right xl:text-8xl">
              Yaleh<br />Nóbrega<span className="text-brandOrange">.</span>
            </h2>
            <div className="mt-6 flex w-full max-w-sm items-center justify-between border-t border-white/15 pt-3 font-mono text-[9px] uppercase tracking-[0.17em] text-slate-500 lg:self-end">
              <span>Brasil · Desenvolvedora</span><span>{time}</span>
            </div>
            <div className="mt-6 flex w-full max-w-sm gap-3 lg:justify-end">
              <a href="#projetos" className="group inline-flex items-center gap-2 rounded-full bg-brandBlue px-4 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-darkBg transition-colors hover:bg-sky-300 sm:text-[10px]">
                Ver projetos <FiArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-200 transition-colors hover:border-brandOrange hover:text-brandOrange sm:text-[10px]">
                Currículo <FiArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div variants={reveal} className="relative grid grid-cols-1 gap-6 border-t border-white/15 pt-5 sm:grid-cols-[1fr_auto] sm:items-end lg:pt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8 lg:gap-x-10">
            <Stat icon={FiFolder} value={stats?.totalRepos ?? null} label="Projetos publicados" />
            <Stat icon={FiGitCommit} value={stats?.totalCommits ?? null} label="Commits" />
            <Stat icon={FiCoffee} value={stats?.coffees ?? null} label="Copos de café" />
          </div>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:block">Feito com intenção · YN</span>
        </motion.div>
      </motion.div>

      <a href="#sobre" aria-label="Role para conhecer mais" className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-white sm:bottom-8">
        <span>Scroll down</span>
        <motion.span animate={reduceMotion ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-brandBlue group-hover:border-brandBlue">
          <FiArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </a>
    </section>
  );
}
