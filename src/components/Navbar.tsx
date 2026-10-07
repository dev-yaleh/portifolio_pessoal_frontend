
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import logo from '../assets/YN. rubiks e black ops one.png'
import menuLogo from '../assets/YN. rubiks e black ops one 2 black blue dot.png'

const links = [
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#stack', label: 'Tech Stack' },
  { href: '/#contato', label: 'Contato' },
  { href: '/projetos', label: 'Todos os projetos' },
];

function RevealText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block overflow-hidden whitespace-nowrap align-bottom">
      <span className="relative z-0">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 block overflow-hidden whitespace-nowrap text-white [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-[2000ms] ease-in-out group-hover/reveal:[clip-path:inset(0_0_0_0)] group-focus-visible/reveal:[clip-path:inset(0_0_0_0)]"
      >
        {children}
      </span>
    </span>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState({ x: 0, y: 0 });
  const [emailCopied, setEmailCopied] = useState(false);

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

  useEffect(() => {
    setMenuOpen(false);
    const sectionId = location.hash.slice(1);
    if (location.pathname === '/' && sectionId) {
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const root = document.documentElement;
    const previousColor = root.style.getPropertyValue('--comet-cursor-color');
    if (menuOpen) root.style.setProperty('--comet-cursor-color', '#070c18');
    else root.style.removeProperty('--comet-cursor-color');
    return () => {
      if (previousColor) root.style.setProperty('--comet-cursor-color', previousColor);
      else root.style.removeProperty('--comet-cursor-color');
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setMenuOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('dev.yaleh@gmail.com');
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      setEmailCopied(false);
    }
  };

  return (
    <>
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
        menuOpen
          ? 'bg-brandOrange/90 backdrop-blur-xl border-b border-darkBg/10'
          : scrolled 
          ? 'bg-darkBg/80 backdrop-blur-xl border-b border-borderCol'
          : 'bg-transparent border-b border-transparent'
      }`}
        //? "glass-card border-b border-border py-3" : "py-5"      }`}
      >
      <div className="relative mx-auto flex h-16 w-full max-w-[1596px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/#inicio" aria-label="Voltar ao início" className="group flex h-6 w-12 items-center sm:h-8 sm:w-16">
          <span className="relative block h-full w-full transition-transform duration-300 group-hover:scale-105">
            <img src={logo} alt="YN. logo" className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <img src={menuLogo} alt="" aria-hidden="true" className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-200 ${menuOpen ? 'opacity-100' : 'opacity-0'}`} />
          </span>
        </a>

        <div className="flex items-center gap-3">
          {/* <div className="hidden sm:flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulseSlow" /> Online
          </div> */}
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <button
                type="button"
                aria-label="Abrir login do administrador"
                onClick={() => {
                  closeMenu();
                  navigate('/admin/login');
                }}
                className={`flex h-6 w-6 items-center justify-center rounded-lg p-0 text-sm transition-all duration-300 shadow-sm focus-ring sm:h-8 sm:w-8 sm:text-base ${menuOpen ? 'border-2 border-darkBg/30 bg-transparent text-darkBg/75 hover:bg-darkBg/5 hover:text-darkBg/75' : 'border border-brandBlue/40 text-brandBlue bg-brandBlue/10 hover:bg-brandBlue hover:text-white'}`}
            >
              <i className="fa-solid fa-gear" />
              </button>
          </motion.div>
          <motion.button
            type="button"
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="focus-ring absolute left-1/2 top-1/2 z-[70] flex h-11 w-9 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[9px] border-0 bg-transparent p-0 transition-transform hover:scale-110 sm:w-11"
            whileTap={{ scale: 0.92 }}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 12, backgroundColor: '#070c18' } : { rotate: 0, y: 0, backgroundColor: '#00a2ff' }} className="h-[3px] w-9 rounded-full sm:w-11" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} className="h-[3px] w-9 rounded-full bg-white sm:w-11" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -12, backgroundColor: '#070c18' } : { rotate: 0, y: 0, backgroundColor: '#e0682b' }} className="h-[3px] w-9 rounded-full sm:w-11" />
          </motion.button>
        </div>
      </div>
      <motion.div
        style={{ scaleX: progress }}
        className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r ${menuOpen ? 'from-darkBg via-brandOrange to-darkBg' : 'from-brandBlue via-brandOrange to-brandBlue'}`}
      />
    </motion.header>
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navegação principal"
          initial={{ clipPath: `circle(0px at ${menuOrigin.x}px ${menuOrigin.y}px)` }}
          animate={{ clipPath: `circle(150vmax at ${menuOrigin.x}px ${menuOrigin.y}px)` }}
          exit={{ clipPath: `circle(0px at ${menuOrigin.x}px ${menuOrigin.y}px)` }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-brandOrange text-darkBg"
        >
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-90 [background-image:linear-gradient(to_right,rgba(7,12,24,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(7,12,24,.18)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
            <div className="absolute -right-48 bottom-0 h-[32rem] w-[32rem] rounded-full bg-[#070c18]/55 blur-[150px]" />
          </div>
          <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[1596px] flex-col px-6 pb-0 pt-28 sm:px-10 lg:px-16">
            <div className="mb-8 flex items-center justify-between border-b border-darkBg/25 pb-4 font-mono text-xs uppercase tracking-[0.22em] text-darkBg/55">
              <span>Navegação</span>
              <span className="text-darkBg/55">© 2026 YN.</span>
            </div>
            <div className="grid flex-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:gap-16">
              <nav className="flex w-full flex-col justify-center" aria-label="Menu do site">
                {links.map((item, index) => {
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 + index * 0.08, duration: 0.45 }}
                      className="group flex items-center gap-2 border-b border-darkBg/35 py-0.5 sm:gap-4 sm:py-1"
                    >
                      <span className="w-6 translate-x-2 font-mono text-[10px] font-light text-white opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 sm:w-12 sm:text-xs">0{index + 1}</span>
                      <Link
                        to={item.href}
                        onClick={() => {
                          closeMenu();
                          const sectionId = item.href.split('#')[1];
                          if (location.pathname === '/' && sectionId) {
                            window.requestAnimationFrame(() => {
                              document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            });
                          }
                        }}
                        className="focus-ring group/link relative block flex-1 whitespace-nowrap font-display text-[clamp(1.5rem,4.8vw,5rem)] font-bold uppercase tracking-tight text-darkBg"
                      >
                        <span className="relative z-0 inline-block">{item.label}</span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 z-10 block overflow-hidden whitespace-nowrap text-white [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-[2000ms] ease-in-out group-hover/link:[clip-path:inset(0_0_0_0)] group-focus-visible/link:[clip-path:inset(0_0_0_0)]"
                        >
                          {item.label}
                        </span>
                      </Link>
                      <span className="translate-x-2 text-xl text-white opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 sm:text-2xl" aria-hidden="true">↗</span>
                    </motion.div>
                  );
                })}
              </nav>

              <aside className="flex flex-col justify-center gap-10 border-t border-darkBg/35 pt-8 font-display lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" aria-label="Contato e informações">
                <section className="space-y-3">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-darkBg/55">Manda um oi</h2>
                  <button type="button" onClick={copyEmail} aria-label="Copiar e-mail" className="group/reveal focus-ring flex flex-col items-start gap-1 text-left text-lg font-semibold tracking-tight sm:text-xl xl:text-2xl">
                    <RevealText>dev.yaleh@gmail.com</RevealText>
                    <span aria-live="polite" className="font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-darkBg/55">{emailCopied ? 'Copiado' : 'Copiar e-mail'}</span>
                  </button>
                </section>

                <section className="space-y-3">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-darkBg/55">Redes Sociais</h2>
                  <ul className="space-y-2 text-lg font-semibold tracking-tight sm:text-xl">
                    <li><a href="https://www.linkedin.com/in/yalehnobrega/" target="_blank" rel="noopener noreferrer" className="group/reveal focus-ring"><RevealText>LinkedIn ↗</RevealText></a></li>
                    <li><a href="https://github.com/dev-yaleh" target="_blank" rel="noopener noreferrer" className="group/reveal focus-ring"><RevealText>Github ↗</RevealText></a></li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-darkBg/55">Localização</h2>
                  <a href="https://share.google/VlIuDgeEKFE90sIGu" target="_blank" rel="noopener noreferrer" className="group/reveal focus-ring inline-block text-lg font-semibold tracking-tight sm:text-xl"><RevealText>Santos, SP · Brasil ↗</RevealText></a>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-darkBg/65">Disponível mundialmente</p>
                </section>
              </aside>
            </div>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-darkBg/25 py-5 font-mono text-xs uppercase tracking-[0.18em] text-darkBg/55">
              <span>Design &amp; desenvolvimento por Yaleh Nóbrega</span>
              <span>© 2026 YN.</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
