export default function Footer() {
  return (
    <footer className="border-t border-borderCol bg-cardBg/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Yaleh Nóbrega. Todos os direitos reservados.</p>
        <div className="flex items-center gap-5">
          <a href="mailto:dev.yaleh@gmail.com" className="hover:text-brandBlue transition-colors flex items-center gap-2">
            <i className="fa-solid fa-envelope text-brandOrange" /> dev.yaleh@gmail.com
          </a>
          <a href="https://github.com/dev-yaleh" target="_blank" rel="noopener noreferrer" className="hover:text-brandBlue transition-colors flex items-center gap-2">
            <i className="fa-brands fa-github text-brandOrange" /> github.com/dev-yaleh
          </a>
        </div>
      </div>
    </footer>
  );
}
