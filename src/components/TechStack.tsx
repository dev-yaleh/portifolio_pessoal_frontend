import { Reveal } from './Reveal';
import type { IconType } from 'react-icons';
import {
  SiAxios,
  SiCss,
  SiDocker,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiInsomnia,
  SiJavascript,
  SiMysql,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRender,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiTypeorm,
  SiVite,
} from 'react-icons/si';

interface TechItem {
  name: string;
  icon: IconType;
}

interface TechCategory {
  number: string;
  name: string;
  accent: string;
  items: TechItem[];
}

const categories: TechCategory[] = [
  {
    number: '01',
    name: 'Frontend',
    accent: 'text-brandBlue',
    items: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'React', icon: SiReact },
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Vite', icon: SiVite },
      { name: 'Axios', icon: SiAxios },
      { name: 'Framer Motion', icon: SiFramer },
      { name: 'Figma', icon: SiFigma },
    ],
  },
  {
    number: '02',
    name: 'Backend & ferramentas',
    accent: 'text-brandOrange',
    items: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'MySQL', icon: SiMysql },
      { name: 'TypeORM', icon: SiTypeorm },
      { name: 'Docker', icon: SiDocker },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Insomnia', icon: SiInsomnia },
      { name: 'Swagger', icon: SiSwagger },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Render', icon: SiRender },
    ],
  },
];

export default function TechStack() {
  return (
    <section
      id="stack"
      className="relative isolate scroll-mt-20 overflow-hidden border-b border-borderCol bg-darkBg px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-52 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brandOrange/[0.06] blur-[150px]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_88%,transparent)]" />
      </div>

      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex items-center justify-between gap-4 border-b border-white/15 pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
          <span><span className="text-brandOrange">03</span> / TECH STACK</span>
          <span className="hidden sm:inline">Ferramentas e tecnologias</span>
        </Reveal>

        <div className="grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-20">
          <Reveal from="left" className="lg:col-span-7">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">Tecnologia em prática</p>
            <h2 className="font-display text-[clamp(3.8rem,8.5vw,8.5rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
              Minha<br />
              <span className="text-brandBlue">stack</span><span className="text-brandOrange">.</span>
            </h2>
          </Reveal>
          <Reveal from="up" delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-brandOrange">
              <span className="h-px w-8 bg-brandOrange" /> Ferramentas do dia a dia
            </p>
            <p className="max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
              Tecnologias que estudo e aplico para construir interfaces, aplicações e soluções digitais.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-white/15">
          {categories.map((category) => (
            <Reveal key={category.number} from="up">
              <div className="grid gap-5 border-b border-white/15 py-6 sm:grid-cols-[64px_190px_1fr] sm:items-start sm:gap-5 lg:py-8">
                <span className={`font-mono text-[10px] ${category.accent}`}>{category.number} /</span>
                <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-white sm:pt-0.5 sm:text-xl">
                  {category.name}
                </h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-4 sm:gap-x-6 lg:gap-x-8">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.name} className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white sm:text-base">
                        <Icon
                          aria-hidden="true"
                          className={`h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 ${category.accent}`}
                        />
                        <span>{item.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
