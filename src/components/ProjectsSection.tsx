import { useEffect, useState } from 'react';
import { getProjetos, getCategorias, type ProjetosParams } from '../api/api';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import type { Categoria, Projeto } from '../types';

const LIMIT = 6;

interface ProjectsSectionProps {
  onTotalChange: (total: number) => void;
}

export default function ProjectsSection({ onTotalChange }: ProjectsSectionProps) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Projeto | null>(null);

  const [categoriaId, setCategoriaId] = useState('');
  const [featured, setFeatured] = useState('');
  const [tech, setTech] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getCategorias()
      .then((res) => setCategorias(res.data))
      .catch(() => setCategorias([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    const params: ProjetosParams = { page, limit: LIMIT };
    if (categoriaId) params.categoriaId = categoriaId;
    if (featured) params.featured = featured;
    if (tech) params.tech = tech;

    getProjetos(params)
      .then((res) => {
        // A API pode responder paginada ({ dados, total, ... }) ou como array simples
        const payload = res.data;
        if (Array.isArray(payload)) {
          setProjetos(payload);
          setTotalPages(1);
          onTotalChange?.(payload.length);
        } else {
          setProjetos(payload.dados || []);
          setTotalPages(payload.totalPages || 1);
          onTotalChange?.(payload.total ?? payload.dados?.length ?? 0);
        }
      })
      .catch(() => setError('Não foi possível carregar os projetos agora.'))
      .finally(() => setLoading(false));
  }, [categoriaId, featured, tech, page]);

  function resetPageAnd<T>(setter: (value: T) => void) {
    return (value: T) => {
      setPage(1);
      setter(value);
    };
  }

  return (
    <section id="projetos" className="py-20 border-b border-borderCol">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-brandOrange text-xs font-bold uppercase tracking-widest">Portfólio</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Projetos</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <select
            value={categoriaId}
            onChange={(e) => resetPageAnd(setCategoriaId)(e.target.value)}
            className="bg-cardBg border border-borderCol text-sm text-slate-200 rounded-xl px-4 py-2.5 focus-ring"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={featured}
            onChange={(e) => resetPageAnd(setFeatured)(e.target.value)}
            className="bg-cardBg border border-borderCol text-sm text-slate-200 rounded-xl px-4 py-2.5 focus-ring"
          >
            <option value="">Todos os projetos</option>
            <option value="true">Somente destaques</option>
          </select>

          <input
            value={tech}
            onChange={(e) => resetPageAnd(setTech)(e.target.value)}
            placeholder="Filtrar por tech (ex: React)"
            className="bg-cardBg border border-borderCol text-sm text-slate-200 rounded-xl px-4 py-2.5 placeholder:text-slate-500 focus-ring"
          />
        </div>

        {loading ? (
          <p className="text-center text-slate-400">Carregando projetos...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : projetos.length === 0 ? (
          <p className="text-center text-slate-400">Nenhum projeto encontrado com esses filtros.</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projetos.map((p) => (
                <ProjectCard key={p.id} projeto={p} onOpen={setSelected} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-borderCol text-slate-300 text-sm disabled:opacity-40 hover:border-brandBlue focus-ring"
                >
                  Anterior
                </button>
                <span className="text-sm text-slate-400">
                  Página {page} de {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-borderCol text-slate-300 text-sm disabled:opacity-40 hover:border-brandBlue focus-ring"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ProjectModal projeto={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
