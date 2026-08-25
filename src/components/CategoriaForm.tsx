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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nome</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Descrição</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-brandBlue text-white font-semibold text-sm hover:bg-sky-500 transition-all disabled:opacity-50"
        >
          {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar categoria'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-borderCol text-slate-300 text-sm hover:text-white transition-all"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
