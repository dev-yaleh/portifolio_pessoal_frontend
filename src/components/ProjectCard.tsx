import type { Projeto } from '../types';

interface ProjectCardProps {
  projeto: Projeto;
  onOpen: (projeto: Projeto) => void;
}

export default function ProjectCard({ projeto, onOpen }: ProjectCardProps) {
  const cover = projeto.images?.[0];

  return (
    <button
      onClick={() => onOpen(projeto)}
      className="group text-left glass-card rounded-2xl border border-borderCol overflow-hidden hover:border-brandBlue/50 hover:-translate-y-1 transition-all duration-300 focus-ring"
    >
      <div className="h-44 bg-darkBg overflow-hidden relative">
        {cover ? (
          <img
            src={cover}
            alt={projeto.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x300/070c18/00a2ff?text=Projeto'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">
            <i className="fa-solid fa-image text-2xl" />
          </div>
        )}
        {projeto.featured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-brandOrange/90 text-white text-[10px] font-bold uppercase tracking-wider">
            Destaque
          </span>
        )}
        {projeto.categoria?.name && (
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-darkBg/80 border border-borderCol text-brandBlue text-[10px] font-semibold uppercase tracking-wider">
            {projeto.categoria.name}
          </span>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-bold text-white group-hover:text-brandBlue transition-colors">{projeto.name}</h3>
        <p className="text-sm text-slate-400 line-clamp-2 font-light">{projeto.description}</p>

        {projeto.techs && projeto.techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {projeto.techs.slice(0, 4).map((tech) => (
              <span key={tech} className="text-[10px] px-2 py-1 rounded-lg bg-brandBlue/10 text-brandBlue border border-brandBlue/20 font-semibold">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-eye" /> {projeto.views ?? 0} visualizações
          </span>
          <span className="text-brandBlue font-semibold group-hover:translate-x-1 transition-transform">
            Ver detalhes <i className="fa-solid fa-arrow-right ml-1" />
          </span>
        </div>
      </div>
    </button>
  );
}
