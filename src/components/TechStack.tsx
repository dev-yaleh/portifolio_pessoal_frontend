import { SectionHeading } from "./Reveal";

interface TechItem {
  name: string;
  icon: string;
}

// Frontend e Backend separados — usados no grid quadrado de baixo.
// A lista combinada (frontend + backend) alimenta a faixa (marquee) do topo.
const frontend: TechItem[] = [
  { name: 'JavaScript', icon: 'fa-brands fa-js' },
  { name: 'TypeScript', icon: 'fa-solid fa-code' },
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'HTML', icon: 'fa-brands fa-html5' },
  { name: 'CSS', icon: 'fa-brands fa-css3-alt' },
  { name: 'Tailwind CSS', icon: 'fa-brands fa-css3-alt' },
  { name: 'Vite', icon: 'fa-solid fa-bolt' },
  { name: 'Axios', icon: 'fa-solid fa-network-wired' },
  { name: 'Framer Motion', icon: 'fa-solid fa-film' },
  { name: 'Figma', icon: 'fa-brands fa-figma' }

];

const backend: TechItem[] = [
  { name: 'Node.js', icon: 'fa-brands fa-node-js' },
  { name: 'NestJS', icon: 'fa-solid fa-shield-halved' },
  { name: 'MySQL', icon: 'fa-solid fa-database' },
  { name: 'TypeORM', icon: 'fa-solid fa-diagram-project' },
  { name: 'Docker', icon: 'fa-brands fa-docker' },
  { name: 'Git', icon: 'fa-brands fa-git-alt' },
  { name: 'GitHub', icon: 'fa-brands fa-github' },
  { name: 'Insomnia', icon: 'fa-solid fa-flask' },
  { name: 'Swagger', icon: 'fa-solid fa-file-lines' },
  { name: 'PostgreSQL', icon: 'fa-solid fa-database' },
  { name: 'Render', icon: 'fa-solid fa-cloud' }
];

const allTechs = [...frontend, ...backend];

// Badge quadrado: ícone grande centralizado em cima, nome pequeno embaixo.
function SkillTile({ name, icon }: TechItem) {
  return (
    <div className="group w-28 h-28 flex flex-col items-center justify-center gap-3 rounded-2xl border border-brandBlue/20 bg-darkBg/60 hover:border-brandBlue/60 hover:bg-brandBlue/5 transition-all duration-300">
      <i className={`${icon} text-3xl text-brandBlue group-hover:text-brandOrange transition-colors`} />
      <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
        {name}
      </span>
    </div>
  );
}

// Item da faixa (marquee): ícone pequeno + nome, sem card — separado por um ponto.
function MarqueeItem({ name, icon }: TechItem) {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <i className={`${icon} text-base text-slate-400`} />
      <span className="text-sm font-mono text-slate-300 whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function TechStack() {
  return (
    <>
      <section id="tech-stacks" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-25">
      {/* <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        <SectionHeading eyebrow="[ 03 ] Tech Stacks" title="Ferramentas" highlight="do dia a dia"/>


          {/* Faixa (marquee) — full-bleed: ignora qualquer max-width dos pais */}
          <div className="relative left-1/2 w-screen -translate-x-1/2 border-y border-borderCol bg-cardBg/30 py-8 mb-14">
            <div className="flex w-max gap-8 px-6 animate-marquee hover:[animation-play-state:paused]">
              {[...allTechs, ...allTechs].map((t, i) => (
            <div key={`${t.name}-${i}`} className="flex items-center gap-8 ">
              <MarqueeItem {...t} />
              {i < allTechs.length * 2 - 1 && <span className="text-slate-600">•</span>}
            </div>
          ))}
        </div>
      </div>

          {/* Grid separado por categoria — lado a lado, 4 colunas cada */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brandBlue mb-5">
                <i className="fa-solid fa-display" /> Frontend
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {frontend.map((t) => (
                  <SkillTile key={t.name} {...t} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-s font-bold uppercase tracking-widest text-brandOrange mb-5">
                <i className="fa-solid fa-server" /> Backend
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {backend.map((t) => (
                  <SkillTile key={t.name} {...t} />
                ))}
              </div>
            </div>
          </div>
    </section>
    </>
  );
}
