import { useState, type FormEvent } from 'react';
import { createCategoria, updateCategoria } from '../api/api';
import type { Categoria } from '../types';

interface CategoriaFormProps {
  categoria: Categoria | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function CategoriaForm({ categoria, onSaved, onCancel }: CategoriaFormProps) {
  const isEditing = Boolean(categoria);
  const [name, setName] = useState(categoria?.name || '');
  const [description, setDescription] = useState(categoria?.description || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isEditing && categoria) {
        await updateCategoria({ id: categoria.id, name, description });
      } else {
        await createCategoria({ name, description });
      }
      onSaved();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao salvar categoria.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="space-y-5">
        <div className="flex items-center gap-3 border-b border-white/15 pb-3">
          <span className="font-mono text-[9px] text-brandBlue">01 /</span>
          <h4 className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Dados da categoria</h4>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category-name" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Nome</label>
            <input
              id="category-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Desenvolvimento web"
              className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="category-description" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Descrição <span className="text-slate-600">· opcional</span></label>
            <textarea
              id="category-description"
              rows={1}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Uma breve descrição"
              className="w-full resize-y border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none"
            />
          </div>
        </div>
      </section>

      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

      <div className="flex flex-wrap gap-3 border-t border-white/15 pt-5">
        <button
          type="submit"
          disabled={saving}
          className="group inline-flex min-w-48 items-center justify-between gap-5 border border-brandBlue/50 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white transition hover:bg-brandBlue hover:text-darkBg disabled:cursor-wait disabled:opacity-50 focus-ring"
        >
          {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar categoria'}
          <span aria-hidden="true" className="text-base transition-transform group-hover:translate-x-1">↗</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-white/15 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400 transition hover:border-white/40 hover:text-white focus-ring"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
