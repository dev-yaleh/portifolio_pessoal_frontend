import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { getProjetos, type ProjetosParams } from '../api/api';
import type { Projeto } from '../types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Reveal } from './Reveal';

const LIMIT = 6;

interface ProjectsSectionProps {
  onTotalChange: (total: number) => void;
}

export default function ProjectsSection({ onTotalChange }: ProjectsSectionProps) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Projeto | null>(null);

  useEffect(() => {
    setLoading(true);
    setError('');
    const params: ProjetosParams = { page: 1, limit: LIMIT };

    getProjetos(params)
      .then((res) => {
        const payload = res.data;
        if (Array.isArray(payload)) {
          setProjetos(payload.slice(0, LIMIT));
          onTotalChange?.(payload.length);
        } else {
          setProjetos(payload.dados || []);
          const total = payload.total ?? payload.dados?.length ?? 0;
          onTotalChange?.(total);
        }
      })
      .catch(() => setError('Não foi possível carregar os projetos agora.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="projetos"
      className="relative isolate scroll-mt-20 overflow-hidden border-b border-borderCol bg-darkBg px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-52 top-1/4 h-[32rem] w-[32rem] rounded-full bg-brandOrange/[0.06] blur-[150px]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />
      </div>

      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex items-center justify-between gap-4 border-b border-white/15 pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
          <span><span className="text-brandOrange">02</span> / PORTFÓLIO</span>
          <span className="hidden sm:inline">Trabalhos selecionados</span>
        </Reveal>

        <div className="grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-20">
          <Reveal from="left" className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3.4rem,8vw,8rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
              Projetos<br />
              <span className="text-brandBlue">selecionados</span><span className="text-brandOrange">.</span>
            </h2>
          </Reveal>
          <Reveal from="up" delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-brandOrange">Ideias em construção</p>
            <p className="max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
              Uma seleção de projetos que reúne interfaces, aplicações e soluções desenvolvidas ao longo da minha trajetória.
            </p>
          </Reveal>
        </div>

        {loading ? (
          <p role="status" className="py-12 text-center font-mono text-xs uppercase tracking-[0.15em] text-slate-400">Carregando projetos...</p>
        ) : error ? (
          <p role="alert" className="py-12 text-center text-red-400">{error}</p>
        ) : projetos.length === 0 ? (
          <p className="py-12 text-center text-slate-400">Nenhum projeto disponível no momento.</p>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              <AnimatePresence mode="popLayout">
                {projetos.map((projeto) => (
                  <motion.div
                    key={projeto.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="min-w-0"
                  >
                    <ProjectCard projeto={projeto} onOpen={setSelected} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Reveal className="mt-10 flex justify-center border-y border-white/15 py-5">
              <Link
                to="/projetos"
                className="group inline-flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300 transition-colors hover:text-brandBlue"
              >
                Ver todos os projetos
                <span className="text-brandBlue transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </>
        )}
      </div>

      <ProjectModal projeto={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
