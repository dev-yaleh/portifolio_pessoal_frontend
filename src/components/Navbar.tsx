import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#stack', label: 'Tech Stack' },
  { href: '#contato', label: 'Contato' },
];

export default function Navbar() {
  const location = useLocation();
  const onHome = location.pathname === '/';

// 1) Barra de progresso: 0→1 conforme a página rola, suavizada com spring
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

//2) Fundo transparente no topo, visível a partir de 24px de scroll  
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-darkBg/80 backdrop-blur-xl border-b border-borderCol'
          : 'bg-transparent border-b border-transparent'
      }`}
        //? "glass-card border-b border-border py-3" : "py-5"      }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brandBlue to-brandOrange p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-darkBg rounded-[10px] flex items-center justify-center font-bold text-brandBlue text-lg">
              YN
            </div>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white block leading-none">Yaleh Nóbrega</span>
            <span className="text-xs text-brandOrange font-medium tracking-wide block -mt-0.1">Full Stack Developer</span>
          </div>
        </Link>

        {onHome && (
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                className="group relative rounded-full px-4 py-2 transition-colors hover:text-brandBlue"
              >
                {l.label}
                {/* sublinhado que "desliza" da esquerda para a direita no hover */}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-brandBlue to-brandOrange transition-transform duration-300 group-hover:scale-x-100" />
              </motion.a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulseSlow" /> Online
          </div>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/admin/login"
              className="px-2 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-brandBlue/40 text-brandBlue bg-brandBlue/10 hover:bg-brandBlue hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm focus-ring"
            >
              <i className="fa-solid fa-gear" />
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brandBlue via-brandOrange to-brandBlue"
      />
    </motion.header>
  );
}
