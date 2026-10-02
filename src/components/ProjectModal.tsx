import { useEffect, useState } from 'react';
import type { Projeto } from '../types';
import { motion } from 'motion/react';

interface ProjectModalProps {
  projeto: Projeto | null;
  onClose: () => void;
}

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
}

export default function ProjectModal({ projeto, onClose }: ProjectModalProps) {
  const [activeMedia, setActiveMedia] = useState(0);

  useEffect(() => {
    setActiveMedia(0);
  }, [projeto?.id]);

  useEffect(() => {
    if (!projeto) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projeto, onClose]);

  if (!projeto) return null;

  const gallery: GalleryItem[] = [
    ...(projeto.images || []).map((src): GalleryItem => ({ type: 'image', src })),
    ...(projeto.videos || []).map((src): GalleryItem => ({ type: 'video', src })),
  ];
  const current = gallery[activeMedia];
  const year = projeto.createdAt ? new Date(projeto.createdAt).getFullYear() : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/80 px-3 py-4 backdrop-blur-md sm:px-6 sm:py-6"
      onClick={onClose}
      role="presentation"
    >
      <div className="flex min-h-full items-center justify-center">
        <motion.section
          initial={{ opacity: 0, scale: 0.975, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.985, y: 8 }}
          transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          className="relative w-full max-w-[1280px] translate-y-8 overflow-hidden border border-white/15 bg-darkBg shadow-2xl shadow-black/50 sm:traslate-y-10"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -right-40 -top-48 h-[28rem] w-[28rem] rounded-full bg-brandBlue/[0.07] blur-[140px]" />
          </div>

          <div className="relative flex items-center justify-between border-b border-white/15 px-5 py-4 sm:px-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
              <span className="text-brandOrange">{year ? `${year} / ` : ''}PROJETO</span>
              {projeto.categoria?.name && <span> · {projeto.categoria.name}</span>}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400 transition hover:text-brandOrange focus-ring"
              aria-label="Fechar detalhes do projeto"
            >
              <span className="hidden sm:inline">Fechar</span>
              <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
            </button>
          </div>

          <div className="relative grid lg:grid-cols-12">
            <div className="p-4 sm:p-6 lg:col-span-7 lg:p-8">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/15 pb-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Biblioteca do projeto</p>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">{String(gallery.length).padStart(2, '0')} arquivos</span>
              </div>

              {current ? (
                <>
                  <figure className="border border-white/15 bg-cardBg/60">
                    <figcaption className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.15em] text-slate-500 sm:px-4 sm:text-[9px]">
                      <span>{String(activeMedia + 1).padStart(2, '0')} / {current.type === 'image' ? 'Imagem selecionada' : 'Vídeo selecionado'}</span>
                      <i className={`fa-solid ${current.type === 'image' ? 'fa-image' : 'fa-video'} text-brandBlue`} aria-hidden="true" />
                    </figcaption>
                    <div className="aspect-video bg-black/30">
                      {current.type === 'image' ? (
                        <img src={current.src} alt={`${projeto.name} — imagem ${activeMedia + 1}`} className="h-full w-full object-contain" />
                      ) : (
                        <video src={current.src} controls preload="metadata" className="h-full w-full object-contain" aria-label={`${projeto.name} — vídeo ${activeMedia + 1}`} />
                      )}
                    </div>
                  </figure>

                  {gallery.length > 1 && (
                    <div
                      className={`mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 ${gallery.length > 4 ? 'project-gallery-scroll max-h-32 overflow-y-auto overscroll-contain pr-1 sm:max-h-36 lg:max-h-40' : ''}`}
                      aria-label="Todos os arquivos do projeto"
                    >
                      {gallery.map((item, index) => (
                        <button
                          key={`${item.src}-${index}`}
                          type="button"
                          onClick={() => setActiveMedia(index)}
                          aria-label={`Selecionar ${item.type === 'image' ? 'imagem' : 'vídeo'} ${index + 1}`}
                          aria-pressed={index === activeMedia}
                          className={`group min-w-0 border text-left transition focus-ring ${index === activeMedia ? 'border-brandBlue' : 'border-white/15 hover:border-white/40'}`}
                        >
                          <span className="relative block aspect-[4/3] overflow-hidden bg-black/30">
                            {item.type === 'image' ? (
                              <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                            ) : (
                              <span className="flex h-full w-full items-center justify-center bg-cardBg text-brandOrange">
                                <i className="fa-solid fa-play text-xs" aria-hidden="true" />
                              </span>
                            )}
                            {index === activeMedia && <span className="absolute inset-0 border-2 border-brandBlue" aria-hidden="true" />}
                          </span>
                          <span className="block truncate px-1.5 py-1.5 font-mono text-[7px] uppercase tracking-[0.1em] text-slate-500 sm:text-[8px]">
                            {String(index + 1).padStart(2, '0')} / {item.type === 'image' ? 'Foto' : 'Vídeo'}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center gap-3 border border-white/10 bg-cardBg/40 text-slate-600">
                  <i className="fa-regular fa-image text-3xl" aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em]">Sem mídia cadastrada</span>
                </div>
              )}
            </div>

            <aside className="flex flex-col border-t border-white/15 p-5 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0">
              <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-brandOrange">
                <span className="h-px w-8 bg-brandOrange" /> Estudo de caso
              </div>

              <h2 id="project-modal-title" className="font-display text-[clamp(2rem,5vw,4.8rem)] font-bold uppercase leading-[0.86] tracking-[-0.065em] text-white">
                {projeto.name}
              </h2>

              <div className="mt-6 border-t border-white/15 pt-5">
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.17em] text-slate-500">Sobre o projeto</p>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300 sm:text-base">{projeto.description}</p>
              </div>

              {projeto.techs && projeto.techs.length > 0 && (
                <div className="mt-6 border-t border-white/15 pt-5">
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.17em] text-slate-500">Tecnologias</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-2">
                    {projeto.techs.map((tech) => (
                      <span key={tech} className="font-mono text-[9px] uppercase tracking-[0.12em] text-brandBlue sm:text-[10px]">[{tech}]</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-8">
                {(projeto.liveLink || projeto.repoLink) && (
                  <div className="flex flex-col gap-2 border-t border-white/15 pt-5 sm:flex-row">
                    {projeto.liveLink && (
                      <a href={projeto.liveLink} target="_blank" rel="noopener noreferrer" className="group inline-flex flex-1 items-center justify-between gap-3 border border-brandBlue/50 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white transition hover:bg-brandBlue hover:text-darkBg focus-ring sm:text-[10px]">
                        Ver projeto ao vivo <i className="fa-solid fa-arrow-up-right-from-square transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </a>
                    )}
                    {projeto.repoLink && (
                      <a href={projeto.repoLink} target="_blank" rel="noopener noreferrer" className="group inline-flex flex-1 items-center justify-between gap-3 border border-white/20 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-300 transition hover:border-brandOrange hover:text-brandOrange focus-ring sm:text-[10px]">
                        Repositório <i className="fa-brands fa-github" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
                  <span>{gallery.length > 0 ? `${String(activeMedia + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')} mídias` : 'Sem mídias cadastradas'}</span>
                  <span className="inline-flex items-center gap-2"><i className="fa-regular fa-eye" aria-hidden="true" /> {projeto.views ?? 0} visualizações</span>
                </div>
              </div>
            </aside>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
