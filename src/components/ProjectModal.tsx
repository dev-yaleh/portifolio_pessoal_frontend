import { useState } from 'react';
import type { Projeto } from '../types';

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
  if (!projeto) return null;

  const gallery: GalleryItem[] = [
    ...(projeto.images || []).map((src): GalleryItem => ({ type: 'image', src })),
    ...(projeto.videos || []).map((src): GalleryItem => ({ type: 'video', src })),
  ];
  const current = gallery[activeMedia];

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-borderCol"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap gap-2 mb-3 px-6 pt-6">
          {projeto.techs?.map((t) => (
            <span key={t} className="px-3 py-1 rounded-lg bg-brandBlue/10 text-brandBlue text-xs font-semibold border border-brandBlue/20">
              {t}
            </span>
          ))}
        </div>

        <div className="px-6 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{projeto.name}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-brandOrange focus-ring rounded px-2" aria-label="Fechar">
            <i className="fa-solid fa-xmark text-xl" />
          </button>
        </div>

        {current && (
          <div className="mt-6 mx-6 rounded-xl overflow-hidden border border-borderCol bg-black aspect-video">
            {current.type === 'image' ? (
              <img src={current.src} alt={projeto.name} className="w-full h-full object-cover" />
            ) : (
              <video src={current.src} controls className="w-full h-full" />
            )}
          </div>
        )}

        {gallery.length > 1 && (
          <div className="flex gap-2 px-6 mt-3 overflow-x-auto pb-1">
            {gallery.map((item, i) => (
              <button
                key={item.src + i}
                onClick={() => setActiveMedia(i)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 focus-ring ${
                  i === activeMedia ? 'border-brandBlue' : 'border-borderCol'
                }`}
              >
                {item.type === 'image' ? (
                  <img src={item.src} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-darkBg text-slate-500">
                    <i className="fa-solid fa-video text-xs" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-brandOrange uppercase tracking-wider mb-2">
              Sobre o Projeto
            </h4>
            <p className="text-slate-300 leading-relaxed font-light whitespace-pre-line">{projeto.description}</p>
          </div>

          <div className="pt-4 border-t border-borderCol flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-3">
              {projeto.liveLink && (
                <a
                  href={projeto.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-brandBlue text-white font-semibold text-sm hover:bg-sky-500 transition-all flex items-center gap-2 shadow-lg shadow-brandBlue/20"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" /> Ver ao vivo
                </a>
              )}
              {projeto.repoLink && (
                <a
                  href={projeto.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-borderCol text-slate-200 font-semibold text-sm hover:border-brandOrange transition-all flex items-center gap-2"
                >
                  <i className="fa-brands fa-github" /> Repositório
                </a>
              )}
            </div>
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <i className="fa-solid fa-eye" /> {projeto.views ?? 0} visualizações
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
