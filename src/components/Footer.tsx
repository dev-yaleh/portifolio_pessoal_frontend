export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-darkBg px-5 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500 sm:text-[10px]">
          <span className="font-semibold text-white">© {new Date().getFullYear()} NY<span className="text-brandOrange">.</span> | Yaleh Nóbrega</span>
        <span className="hidden text-slate-700 sm:inline"> {' '}- </span>
          <span> Todos os direitos reservados</span>
        </div>

        <a
          href="#inicio"
          className="group inline-flex items-center gap-2 self-start font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-brandBlue focus-ring sm:self-auto sm:text-[10px]"
        >
          Voltar ao topo
          <span aria-hidden="true" className="text-base transition-transform group-hover:-translate-y-0.5">↑</span>
        </a>
      </div>
    </footer>
  );
}
