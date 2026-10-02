import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { getProjetos } from '../api/api';
import type { Projeto } from '../types';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { Reveal } from '../components/Reveal';

const PAGE_SIZE = 12;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projeto[]>([]);
  const [selected, setSelected] = useState<Projeto | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    getProjetos({ page, limit: PAGE_SIZE })
      .then(({ data }) => {
        if (Array.isArray(data)) {
          const start = (page - 1) * PAGE_SIZE;
          setProjects(data.slice(start, start + PAGE_SIZE));
          setTotalProjects(data.length);
          setTotalPages(Math.max(1, Math.ceil(data.length / PAGE_SIZE)));
          return;
        }

        setProjects(data.dados || []);
        setTotalProjects(data.total ?? data.dados?.length ?? 0);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => setError('Não foi possível carregar os projetos agora.'))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-darkBg px-5 pb-24 pt-28 sm:px-8 sm:pb-28 lg:px-12 lg:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-48 top-24 h-[32rem] w-[32rem] rounded-full bg-brandBlue/[0.08] blur-[150px]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_88%,transparent)]" />
      </div>

      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex items-center justify-between gap-4 border-b border-white/15 pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
          <span><span className="text-brandOrange">02</span> / PROJETOS</span>
          <Link to="/#projetos" className="group inline-flex items-center gap-2 transition-colors hover:text-brandBlue">
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> Voltar ao portfólio
          </Link>
        </Reveal>

        <div className="grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-20">
          <Reveal from="left" className="lg:col-span-7">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">Arquivo de projetos</p>
            <h1 className="font-display text-[clamp(3.4rem,8vw,8rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
              Todos os<br />
              <span className="text-brandBlue">projetos</span><span className="text-brandOrange">.</span>
            </h1>
          </Reveal>
          <Reveal from="up" delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-brandOrange">Trabalhos selecionados</p>
            <p className="max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
              Interfaces, aplicações e soluções desenvolvidas ao longo da minha trajetória em tecnologia.
            </p>
          </Reveal>
        </div>

        <div id="lista-projetos" className="scroll-mt-28 border-t border-white/15 pt-5">
          <div className="mb-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">
            <span>Projetos</span>
            <span>{String(totalProjects).padStart(2, '0')} itens</span>
          </div>

          {loading ? (
            <p role="status" className="py-16 text-center font-mono text-xs uppercase tracking-[0.15em] text-slate-400">Carregando projetos...</p>
          ) : error ? (
            <p role="alert" className="py-16 text-center text-red-400">{error}</p>
          ) : projects.length === 0 ? (
            <p className="py-16 text-center text-slate-400">Nenhum projeto disponível no momento.</p>
          ) : (
            <>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                <AnimatePresence mode="popLayout">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.3 }}
                      className="min-w-0"
                    >
                      <ProjectCard projeto={project} onOpen={setSelected} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-5 border-y border-white/15 py-5 font-mono text-[10px] uppercase tracking-[0.14em]">
                  <button
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1 || loading}
                    className="text-slate-300 transition-colors hover:text-brandBlue disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Anterior
                  </button>
                  <span className="text-slate-500">{String(page).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
                  <button
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page === totalPages || loading}
                    className="text-slate-300 transition-colors hover:text-brandBlue disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Próxima →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ProjectModal projeto={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
