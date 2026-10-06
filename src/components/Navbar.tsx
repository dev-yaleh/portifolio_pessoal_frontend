
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import logo from '../assets/YN. rubiks e black ops one.png'

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
      <div className="mx-auto flex w-full max-w-[1596px] items-center justify-between px-4 sm:px-6 lg:px-8 h-16 ">
        <a href="/#inicio" aria-label="Voltar ao início" className="flex items-center gap-1 group">
          <img src={logo} alt="YN. logo"className="h-6 w-auto sm:h-8 object-contain transition-transform duration-300 group-hover:scale-105" />
        </a>

        {onHome && (
          <nav className="hidden md:flex items-center gap-0 text-base font-medium text-slate-100 uppercase font-mono ">
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
                <span className="absolute inset-x-4 bottom-0.5 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brandBlue to-brandOrange transition-transform duration-300 group-hover:scale-x-100" />
              </motion.a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {/* <div className="hidden sm:flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulseSlow" /> Online
          </div> */}
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/admin/login"
              className="px-2.5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg border border-brandBlue/40 text-brandBlue bg-brandBlue/10 hover:bg-brandBlue hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm focus-ring"
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
