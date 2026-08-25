interface TechItem {
  name: string;
  icon: string;
}

const stack: TechItem[] = [
  { name: 'JavaScript', icon: 'fa-brands fa-js' },
  { name: 'TypeScript', icon: 'fa-solid fa-code' },
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js' },
  { name: 'NestJS', icon: 'fa-solid fa-shield-halved' },
  { name: 'MySQL', icon: 'fa-solid fa-database' },
  { name: 'TypeORM', icon: 'fa-solid fa-diagram-project' },
  { name: 'Docker', icon: 'fa-brands fa-docker' },
  { name: 'Git', icon: 'fa-brands fa-git-alt' },
  { name: 'HTML/CSS', icon: 'fa-brands fa-html5' },
];

export default function TechStack() {
  return (
    <section id="stack" className="py-20 border-b border-borderCol bg-cardBg/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brandOrange text-xs font-bold uppercase tracking-widest">Tech Stack</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Ferramentas do dia a dia</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {stack.map((t) => (
            <div
              key={t.name}
              className="glass-card rounded-xl p-5 border border-borderCol flex flex-col items-center gap-3 hover:border-brandBlue/50 transition-colors"
            >
              <i className={`${t.icon} text-2xl text-brandBlue`} />
              <span className="text-xs font-medium text-slate-300 text-center">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
