import { motion } from 'motion/react';
import { SectionTitle } from './Reveal';

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
        <SectionTitle eyebrow="Tech Stack" title="Ferramentas do dia a dia" />

        {/* Pills com borda que reage no hover e reveal em cascata */}
        <div className="flex flex-wrap justify-center gap-3">
          {stack.map((t, i) => (
            <motion.span
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.045 }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-2 rounded-full border border-borderCol bg-darkBg/60 px-4 py-2 font-mono text-sm text-slate-300 transition-colors hover:border-brandBlue/60 hover:text-white"
            >
              <i className={`${t.icon} text-brandBlue`} />
              {t.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
