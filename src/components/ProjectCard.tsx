import type { Projeto } from '../types';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { MouseEvent } from 'react';

interface ProjectCardProps {
  projeto: Projeto;
  onOpen: (projeto: Projeto) => void;
}

export default function ProjectCard({ projeto, onOpen }: ProjectCardProps) {
  const cover = projeto.images?.[0];
  const year = projeto.createdAt ? new Date(projeto.createdAt).getFullYear() : null;
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [5, -5]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-5, 5]), { stiffness: 180, damping: 22 });

  function trackPointer(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
    event.currentTarget.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
  }

  return (
    <motion.button
      onClick={() => onOpen(projeto)}
      onMouseMove={trackPointer}
      onMouseLeave={() => { pointerX.set(0.5); pointerY.set(0.5); }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className="project-glow group relative w-full text-left focus-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-cardBg">
        {cover ? (
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x300/070c18/00a2ff?text=Projeto'; }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-600 text-sm">
            <i className="fa-regular fa-image text-2xl" aria-hidden="true" />
          </div>
        )}
        <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-darkBg/45 to-transparent opacity-70" aria-hidden="true" />
      </div>

      <div className="pt-4 sm:pt-5">
        <div className="mb-3 flex min-h-5 flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
          {year && <span>{year}</span>}
          {year && projeto.categoria?.name && <span className="h-3 w-px bg-white/20" aria-hidden="true" />}
          {projeto.categoria?.name && <span className="text-slate-400">{projeto.categoria.name}</span>}
          {projeto.featured && <span className="border border-brandOrange/30 px-2 py-0.5 text-brandOrange">Em destaque</span>}
        </div>

        <h3 className="line-clamp-2 font-display text-xl font-bold uppercase leading-[0.95] tracking-[-0.045em] text-white transition-colors group-hover:text-brandBlue sm:text-2xl">
          {projeto.name}
        </h3>

        {projeto.techs && projeto.techs.length > 0 && (
          <p className="mt-3 line-clamp-1 font-mono text-[9px] uppercase tracking-[0.14em] text-brandBlue/80 sm:text-[10px]">
            {projeto.techs.slice(0, 4).map((tech) => `[${tech}]`).join(' — ')}
          </p>
        )}

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          {projeto.description}
        </p>

        <span className="mt-5 flex items-center justify-between border-t border-white/15 pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 transition-colors group-hover:text-brandBlue sm:text-[10px]">
          <span>Ver detalhes do projeto</span>
          <span className="flex h-8 w-8 items-center justify-center border border-white/15 text-brandBlue transition-all group-hover:border-brandBlue group-hover:bg-brandBlue group-hover:text-darkBg">
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" />
          </span>
        </span>
      </div>
    </motion.button>
  );
}
