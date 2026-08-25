import { Link, useLocation } from 'react-router-dom';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#stack', label: 'Tech Stack' },
  { href: '#contato', label: 'Contato' },
];

export default function Navbar() {
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-darkBg/80 border-b border-borderCol">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brandBlue to-brandOrange p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-darkBg rounded-[10px] flex items-center justify-center font-bold text-brandBlue text-lg">
              YN
            </div>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white block">Yaleh Nóbrega</span>
            <span className="text-xs text-brandOrange font-medium tracking-wide">Full Stack Developer</span>
          </div>
        </Link>

        {onHome && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-brandBlue hover:underline transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulseSlow" /> Online
          </div>
          <Link
            to="/admin/login"
            className="px-2 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-brandBlue/40 text-brandBlue bg-brandBlue/10 hover:bg-brandBlue hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm focus-ring"
          >
            <i className="fa-solid fa-gear" />
          </Link>
        </div>
      </div>
    </header>
  );
}
