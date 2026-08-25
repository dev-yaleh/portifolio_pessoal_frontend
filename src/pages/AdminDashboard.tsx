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

export default function AdminDashboard() {
  const { username, logout } = useAuth();
  const [tab, setTab] = useState<TabId>('projetos');

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Painel administrativo</h1>
          <p className="text-sm text-slate-400 mt-1">Logado como <span className="text-brandBlue">{username}</span></p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl border border-borderCol text-slate-300 text-sm hover:border-red-500/50 hover:text-red-400 transition-all"
        >
          <i className="fa-solid fa-right-from-bracket mr-2" /> Sair
        </button>
      </div>

      <div className="flex gap-2 mb-8 border-b border-borderCol">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              tab === t.id
                ? 'border-brandBlue text-brandBlue'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <i className={t.icon} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'projetos' && <ProjetosTab />}
      {tab === 'categorias' && <CategoriasTab />}
      {tab === 'mensagens' && <MensagensTab />}
    </main>
  );
}

// ---------- Aba Projetos ----------
// editing: null = fechado, {} = criando, {...projeto} = editando
type EditingProjeto = Partial<Projeto> | null;

function ProjetosTab() {
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white">Seus projetos</h2>
        {!editing && (
          <button
            onClick={() => setEditing({})}
            className="px-4 py-2 rounded-xl bg-brandBlue text-white text-sm font-semibold hover:bg-sky-500 transition-all"
          >
            <i className="fa-solid fa-plus mr-2" /> Novo projeto
          </button>
        )}
      </div>

      {editing !== null && (
        <div className="glass-card rounded-2xl border border-borderCol p-6 mb-8">
          <h3 className="text-brandBlue font-semibold mb-4">
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
      ) : (
        <div className="space-y-3">
          {projetos.map((p) => (
            <div key={p.id} className="glass-card rounded-xl border border-borderCol p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-darkBg shrink-0">
                {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">{p.name}</p>
                <p className="text-xs text-slate-500 truncate">{p.description}</p>
              </div>
              <div className="flex gap-2 shrink-0 text-xs">
                <button
                  onClick={() => setEditing(p)}
                  className="px-3 py-1.5 rounded-lg border border-borderCol text-slate-300 hover:border-brandBlue hover:text-brandBlue transition-all"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deletingId === p.id}
                  className="px-3 py-1.5 rounded-lg border border-borderCol text-slate-300 hover:border-red-500 hover:text-red-400 transition-all disabled:opacity-50"
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white">Categorias</h2>
        {!editing && (
          <button
            onClick={() => setEditing({})}
            className="px-4 py-2 rounded-xl bg-brandBlue text-white text-sm font-semibold hover:bg-sky-500 transition-all"
          >
            <i className="fa-solid fa-plus mr-2" /> Nova categoria
          </button>
        )}
      </div>

      {editing !== null && (
        <div className="glass-card rounded-2xl border border-borderCol p-6 mb-8 max-w-md">
          <h3 className="text-brandBlue font-semibold mb-4">
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
        <div className="grid sm:grid-cols-2 gap-3">
          {categorias.map((c) => (
            <div key={c.id} className="glass-card rounded-xl border border-borderCol p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-white font-semibold truncate">{c.name}</p>
                <p className="text-xs text-slate-500 truncate">{c.description}</p>
              </div>
              <div className="flex gap-2 shrink-0 text-xs">
                <button
                  onClick={() => setEditing(c)}
                  className="px-3 py-1.5 rounded-lg border border-borderCol text-slate-300 hover:border-brandBlue hover:text-brandBlue transition-all"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  disabled={deletingId === c.id}
                  className="px-3 py-1.5 rounded-lg border border-borderCol text-slate-300 hover:border-red-500 hover:text-red-400 transition-all disabled:opacity-50"
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
function MensagensTab() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getMensagens().then((res) => setMensagens(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleMarcarLida(id: number) {
    await marcarMensagemLida(id);
    load();
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6">Mensagens recebidas</h2>

      {loading ? (
        <p className="text-slate-400 text-sm">Carregando...</p>
      ) : mensagens.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhuma mensagem recebida ainda.</p>
      ) : (
        <div className="space-y-3">
          {mensagens.map((m) => (
            <div
              key={m.id}
              className={`glass-card rounded-xl border p-4 ${m.lida ? 'border-borderCol' : 'border-brandBlue/50'}`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-white font-semibold flex items-center gap-2">
                    {m.nome}
                    {!m.lida && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-brandBlue/20 text-brandBlue font-bold uppercase">
                        Nova
                      </span>
                    )}
                  </p>
                  <a href={`mailto:${m.email}`} className="text-xs text-brandBlue hover:underline">{m.email}</a>
                </div>
                {!m.lida && (
                  <button
                    onClick={() => handleMarcarLida(m.id)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-borderCol text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-all"
                  >
                    Marcar como lida
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-300 font-light mt-3 whitespace-pre-line">{m.mensagem}</p>
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
