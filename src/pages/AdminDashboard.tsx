import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getProjetos,
  deleteProjeto,
  getCategorias,
  deleteCategoria,
  getMensagens,
  marcarMensagemLida,
} from '../api/api';
import ProjetoForm from '../components/ProjetoForm';
import CategoriaForm from '../components/CategoriaForm';
import type { Categoria, Mensagem, Projeto } from '../types';

const TABS = [
  { id: 'projetos', label: 'Projetos', icon: 'fa-solid fa-diagram-project' },
  { id: 'categorias', label: 'Categorias', icon: 'fa-solid fa-tags' },
  { id: 'mensagens', label: 'Mensagens', icon: 'fa-solid fa-envelope' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface FilterFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function FilterField({ id, label, value, onChange, placeholder }: FilterFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-slate-400">{label}</span>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-white/20 bg-transparent px-0 py-2 text-xs text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none"
      />
    </label>
  );
}

export default function AdminDashboard() {
  const { username, logout } = useAuth();
  const [tab, setTab] = useState<TabId>('projetos');
  const [filterOpen, setFilterOpen] = useState(false);
  const [projectNameFilter, setProjectNameFilter] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('');
  const [messageNameFilter, setMessageNameFilter] = useState('');
  const [messageEmailFilter, setMessageEmailFilter] = useState('');
  const [messageTextFilter, setMessageTextFilter] = useState('');

  function clearFilters() {
    setProjectNameFilter('');
    setProjectCategoryFilter('');
    setMessageNameFilter('');
    setMessageEmailFilter('');
    setMessageTextFilter('');
  }

  return (
    <main className="relative isolate min-h-0 overflow-hidden bg-darkBg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-31">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-48 top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-brandBlue/[0.06] blur-[150px]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
          <span><span className="text-brandOrange">YN</span> / PAINEL ADMINISTRATIVO</span>
          <a href="/" className="transition-colors hover:text-brandBlue">Ver portfólio ↗</a>
        </div>

        <div className="grid gap-10 py-9 sm:py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <aside className="lg:col-span-4">
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-brandOrange sm:text-[10px]">Área de gestão</p>
            <h1 className="font-display text-[clamp(3rem,7vw,6.2rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
              Painel<br /><span className="text-brandBlue">admin</span><span className="text-brandOrange">.</span>
            </h1>
            <div className="mt-8 border-t border-white/15 pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">Sessão ativa</p>
              <p className="mt-2 font-display text-lg text-white">{username}</p>
            </div>
            <button
              onClick={logout}
              className="group mt-5 inline-flex items-center gap-3 border border-white/20 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-300 transition hover:border-brandOrange hover:text-brandOrange focus-ring"
            >
              Encerrar sessão <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
            </button>
          </aside>

          <div className="min-w-0 lg:col-span-8">
            <div className="flex items-center justify-between gap-3 border-b border-white/15">
              <div role="tablist" aria-label="Seções administrativas" className="flex min-w-0 gap-5 overflow-x-auto">
                {TABS.map((t, index) => (
                  <button
                    key={t.id}
                    id={`admin-tab-${t.id}`}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => { setTab(t.id); setFilterOpen(false); }}
                    className={`flex shrink-0 items-center gap-2 border-b py-4 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors sm:text-[10px] ${
                      tab === t.id
                        ? 'border-brandBlue text-brandBlue'
                        : 'border-transparent text-slate-500 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[8px] opacity-60">0{index + 1}</span>
                    <i className={t.icon} aria-hidden="true" /> {t.label}
                  </button>
                ))}
              </div>

              {tab !== 'categorias' && (
                <div className="relative shrink-0">
                  <button
                    type="button"
                    aria-expanded={filterOpen}
                    aria-controls="admin-filter-popover"
                    onClick={() => setFilterOpen((open) => !open)}
                    className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition focus-ring sm:text-[10px] ${filterOpen ? 'border-brandBlue text-brandBlue' : 'border-white/20 text-slate-400 hover:border-brandBlue/60 hover:text-white'}`}
                  >
                    <i className="fa-solid fa-sliders" aria-hidden="true" />
                    <span className="hidden sm:inline">Filtrar</span>
                  </button>

                  {filterOpen && (
                    <div id="admin-filter-popover" role="dialog" aria-label="Filtros" className="absolute right-0 top-full z-30 mt-3 w-[min(88vw,22rem)] border border-white/15 bg-cardBg/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
                      <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brandOrange">
                          {tab === 'projetos' ? 'Filtrar projetos' : 'Filtrar mensagens'}
                        </p>
                        <button type="button" onClick={clearFilters} className="font-mono text-[8px] uppercase tracking-wider text-slate-500 transition hover:text-white">Limpar</button>
                      </div>

                      <div className="space-y-4">
                        {tab === 'projetos' ? (
                          <>
                            <FilterField id="project-name-filter" label="Nome do projeto" value={projectNameFilter} onChange={setProjectNameFilter} placeholder="Buscar por nome" />
                            <FilterField id="project-category-filter" label="Categoria" value={projectCategoryFilter} onChange={setProjectCategoryFilter} placeholder="Buscar por categoria" />
                          </>
                        ) : (
                          <>
                            <FilterField id="message-name-filter" label="Nome" value={messageNameFilter} onChange={setMessageNameFilter} placeholder="Buscar por nome" />
                            <FilterField id="message-email-filter" label="E-mail" value={messageEmailFilter} onChange={setMessageEmailFilter} placeholder="Buscar por e-mail" />
                            <FilterField id="message-text-filter" label="Mensagem" value={messageTextFilter} onChange={setMessageTextFilter} placeholder="Buscar no conteúdo" />
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div role="tabpanel" aria-labelledby={`admin-tab-${tab}`} className="pt-7 sm:pt-9">
              {tab === 'projetos' && <ProjetosTab nameFilter={projectNameFilter} categoryFilter={projectCategoryFilter} />}
              {tab === 'categorias' && <CategoriasTab />}
              {tab === 'mensagens' && <MensagensTab nameFilter={messageNameFilter} emailFilter={messageEmailFilter} textFilter={messageTextFilter} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ---------- Aba Projetos ----------
// editing: null = fechado, {} = criando, {...projeto} = editando
type EditingProjeto = Partial<Projeto> | null;

function ProjetosTab({ nameFilter, categoryFilter }: { nameFilter: string; categoryFilter: string }) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EditingProjeto>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function load() {
    setLoading(true);
    Promise.all([getProjetos({ limit: 100 }), getCategorias()])
      .then(([resProjetos, resCategorias]) => {
        const payload = resProjetos.data;
        setProjetos(Array.isArray(payload) ? payload : payload.dados || []);
        setCategorias(resCategorias.data);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  const filteredProjetos = projetos.filter((projeto) => {
    const matchesName = projeto.name.toLocaleLowerCase().includes(nameFilter.trim().toLocaleLowerCase());
    const matchesCategory = (projeto.categoria?.name || '').toLocaleLowerCase().includes(categoryFilter.trim().toLocaleLowerCase());
    return matchesName && matchesCategory;
  });

  async function handleDelete(id: number) {
    if (!confirm('Remover este projeto? Essa ação não pode ser desfeita.')) return;
    setDeletingId(id);
    try {
      await deleteProjeto(id);
      load();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-brandOrange">01 / Biblioteca</p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">Seus projetos</h2>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing({})}
            className="group inline-flex items-center gap-3 border border-brandBlue/50 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white transition hover:bg-brandBlue hover:text-darkBg focus-ring sm:text-[10px]"
          >
            <i className="fa-solid fa-plus" aria-hidden="true" /> Novo projeto
          </button>
        )}
      </div>

      {editing !== null && (
        <div className="mb-8 border-y border-white/15 py-6 sm:py-8">
          <h3 className="mb-5 font-display text-xl font-semibold text-white">
            {editing.id ? `Editando "${editing.name}"` : 'Novo projeto'}
          </h3>
          <ProjetoForm
            projeto={editing.id ? (editing as Projeto) : null}
            categorias={categorias}
            onSaved={() => { setEditing(null); load(); }}
            onCancel={() => { setEditing(null); load(); }}
          />
        </div>
      )}

      {loading ? (
        <p className="text-slate-400 text-sm">Carregando...</p>
      ) : projetos.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhum projeto cadastrado ainda.</p>
      ) : filteredProjetos.length === 0 ? (
        <p className="border-t border-white/15 py-5 text-sm text-slate-400">Nenhum projeto corresponde aos filtros aplicados.</p>
      ) : (
        <div className="border-t border-white/15">
          {filteredProjetos.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-4 border-b border-white/15 py-4 sm:flex-nowrap sm:gap-6">
              <div className="h-16 w-20 shrink-0 overflow-hidden bg-cardBg">
                {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate font-display font-semibold text-white sm:text-lg">{p.name}</p>
                <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">{p.description}</p>
              </div>
              <div className="flex shrink-0 gap-2 text-[10px]">
                <button
                  onClick={() => setEditing(p)}
                  className="border border-white/15 px-3 py-2 font-mono uppercase tracking-wider text-slate-300 transition hover:border-brandBlue hover:text-brandBlue"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deletingId === p.id}
                  className="border border-white/15 px-3 py-2 font-mono uppercase tracking-wider text-slate-300 transition hover:border-red-500 hover:text-red-400 disabled:opacity-50"
                >
                  {deletingId === p.id ? 'Removendo...' : 'Remover'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Aba Categorias ----------
type EditingCategoria = Partial<Categoria> | null;

function CategoriasTab() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EditingCategoria>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function load() {
    setLoading(true);
    getCategorias().then((res) => setCategorias(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id: number) {
    if (!confirm('Remover esta categoria?')) return;
    setDeletingId(id);
    try {
      await deleteCategoria(id);
      load();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-brandOrange">02 / Organização</p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">Categorias</h2>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing({})}
            className="inline-flex items-center gap-3 border border-brandBlue/50 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white transition hover:bg-brandBlue hover:text-darkBg focus-ring sm:text-[10px]"
          >
            <i className="fa-solid fa-plus" aria-hidden="true" /> Nova categoria
          </button>
        )}
      </div>

      {editing !== null && (
        <div className="mb-8 max-w-xl border-y border-white/15 py-6 sm:py-8">
          <h3 className="mb-5 font-display text-xl font-semibold text-white">
            {editing.id ? `Editando "${editing.name}"` : 'Nova categoria'}
          </h3>
          <CategoriaForm
            categoria={editing.id ? (editing as Categoria) : null}
            onSaved={() => { setEditing(null); load(); }}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {loading ? (
        <p className="text-slate-400 text-sm">Carregando...</p>
      ) : categorias.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhuma categoria cadastrada ainda.</p>
      ) : (
        <div className="grid border-t border-white/15 sm:grid-cols-2 sm:gap-x-10">
          {categorias.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-3 border-b border-white/15 py-4">
              <div className="min-w-0">
                <p className="truncate font-display font-semibold text-white">{c.name}</p>
                <p className="mt-1 truncate text-xs text-slate-500">{c.description}</p>
              </div>
              <div className="flex gap-2 shrink-0 text-xs">
                <button
                  onClick={() => setEditing(c)}
                  className="border border-white/15 px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-slate-300 transition hover:border-brandBlue hover:text-brandBlue"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  disabled={deletingId === c.id}
                  className="border border-white/15 px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-slate-300 transition hover:border-red-500 hover:text-red-400 disabled:opacity-50"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Aba Mensagens ----------
function MensagensTab({ nameFilter, emailFilter, textFilter }: { nameFilter: string; emailFilter: string; textFilter: string }) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getMensagens().then((res) => setMensagens(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  const filteredMensagens = mensagens.filter((mensagem) =>
    mensagem.nome.toLocaleLowerCase().includes(nameFilter.trim().toLocaleLowerCase()) &&
    mensagem.email.toLocaleLowerCase().includes(emailFilter.trim().toLocaleLowerCase()) &&
    mensagem.mensagem.toLocaleLowerCase().includes(textFilter.trim().toLocaleLowerCase())
  );

  async function handleMarcarLida(id: number) {
    await marcarMensagemLida(id);
    load();
  }

  return (
    <div>
      <div className="mb-6">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-brandOrange">03 / Caixa de entrada</p>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">Mensagens recebidas</h2>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Carregando...</p>
      ) : mensagens.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhuma mensagem recebida ainda.</p>
      ) : filteredMensagens.length === 0 ? (
        <p className="border-t border-white/15 py-5 text-sm text-slate-400">Nenhuma mensagem corresponde aos filtros aplicados.</p>
      ) : (
        <div className="border-t border-white/15">
          {filteredMensagens.map((m) => (
            <div
              key={m.id}
              className={`border-b py-5 sm:py-6 ${m.lida ? 'border-white/15' : 'border-brandBlue/50'}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-display text-lg font-semibold text-white sm:text-xl">
                    {m.nome}
                    {!m.lida && (
                      <span className="border border-brandBlue/30 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-brandBlue">
                        Nova
                      </span>
                    )}
                  </p>
                  <a href={`mailto:${m.email}`} className="mt-1 inline-block font-mono text-[10px] text-brandBlue hover:underline">{m.email}</a>
                </div>
                {!m.lida && (
                  <button
                    onClick={() => handleMarcarLida(m.id)}
                    className="border border-white/15 px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400"
                  >
                    Marcar como lida
                  </button>
                )}
              </div>
              <p className="mt-4 max-w-4xl whitespace-pre-line text-sm leading-relaxed text-slate-300 sm:text-base">{m.mensagem}</p>
              {m.createdAt && (
                <p className="text-xs text-slate-500 mt-2">{new Date(m.createdAt).toLocaleString('pt-BR')}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
