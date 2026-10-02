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
      className="project-glow group w-full overflow-hidden text-left transition-transform duration-300 focus-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-cardBg">
        {cover ? (
          <img
            src={cover}
            alt={projeto.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x300/070c18/00a2ff?text=Projeto'; }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-600 text-sm">
            <i className="fa-solid fa-image text-2xl" />
          </div>
        )}
        {projeto.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-darkBg/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-brandOrange backdrop-blur-sm">
            Destaque
          </span>
        )}
      </div>

      <div className="pt-4 sm:pt-5">
        <div className="mb-2 flex min-h-5 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
          {year && <span>{year}</span>}
          {projeto.categoria?.name && <span className="text-slate-400">{projeto.categoria.name}</span>}
          {projeto.featured && <span className="rounded-full border border-white/15 px-2 py-0.5 text-brandOrange">Destaque</span>}
        </div>

        <h3 className="font-display text-lg font-bold uppercase leading-snug tracking-[-0.03em] text-white transition-colors group-hover:text-brandBlue sm:text-xl">
          {projeto.name}
        </h3>

        {projeto.techs && projeto.techs.length > 0 && (
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500 sm:text-[10px]">
            {projeto.techs.slice(0, 4).map((tech) => `[${tech}]`).join(' — ')}
          </p>
        )}

        <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-slate-400 sm:text-base">
          {projeto.description}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 transition-colors group-hover:text-brandBlue">
          Ver detalhes do projeto
          <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.button>
  );
}
