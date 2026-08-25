import { useState, type FormEvent } from 'react';
import {
  createProjeto,
  updateProjeto,
  uploadProjetoImagem,
  uploadProjetoVideo,
} from '../api/api';
import type { Categoria, Projeto } from '../types';

interface ProjetoFormState {
  id?: number;
  name: string;
  description: string;
  techs: string;
  liveLink: string;
  repoLink: string;
  featured: boolean;
  order: number | string;
  categoriaId: number | string;
}

const emptyForm: ProjetoFormState = {
  name: '',
  description: '',
  techs: '',
  liveLink: '',
  repoLink: '',
  featured: false,
  order: 0,
  categoriaId: '',
};

interface ProjetoFormProps {
  projeto: Projeto | null;
  categorias: Categoria[];
  onSaved: () => void;
  onCancel: () => void;
}

export default function ProjetoForm({ projeto, categorias, onSaved, onCancel }: ProjetoFormProps) {
  const isEditing = Boolean(projeto);
  const [form, setForm] = useState<ProjetoFormState>(
    projeto
      ? {
          id: projeto.id,
          name: projeto.name,
          description: projeto.description,
          techs: (projeto.techs || []).join(', '),
          liveLink: projeto.liveLink || '',
          repoLink: projeto.repoLink || '',
          featured: Boolean(projeto.featured),
          order: projeto.order ?? 0,
          categoriaId: projeto.categoria?.id ?? '',
        }
      : emptyForm
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [savedId, setSavedId] = useState<number | null>(projeto?.id ?? null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaMsg, setMediaMsg] = useState('');

  function update<K extends keyof ProjetoFormState>(field: K, value: ProjetoFormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      name: form.name,
      description: form.description,
      techs: form.techs.split(',').map((t) => t.trim()).filter(Boolean),
      images: [] as string[],
      videos: [] as string[],
      liveLink: form.liveLink,
      repoLink: form.repoLink,
      featured: form.featured,
      order: Number(form.order) || 0,
      ...(form.categoriaId ? { categoria: { id: Number(form.categoriaId) } } : {}),
    };

    try {
      if (isEditing || savedId) {
        const { data } = await updateProjeto({ id: savedId as number, ...payload });
        setSavedId(data.id);
      } else {
        const { data } = await createProjeto(payload);
        setSavedId(data.id);
      }
      onSaved();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao salvar o projeto.');
    } finally {
      setSaving(false);
    }
  }

  async function handleUploadImagem() {
    if (!savedId || !imageFile) return;
    setUploadingMedia(true);
    setMediaMsg('');
    try {
      await uploadProjetoImagem(savedId, imageFile);
      setMediaMsg('Imagem enviada com sucesso!');
      setImageFile(null);
    } catch (err: any) {
      setMediaMsg(err.response?.data?.message || 'Erro ao enviar a imagem.');
    } finally {
      setUploadingMedia(false);
    }
  }

  async function handleUploadVideo() {
    if (!savedId || !videoFile) return;
    setUploadingMedia(true);
    setMediaMsg('');
    try {
      await uploadProjetoVideo(savedId, videoFile);
      setMediaMsg('Vídeo enviado com sucesso!');
      setVideoFile(null);
    } catch (err: any) {
      setMediaMsg(err.response?.data?.message || 'Erro ao enviar o vídeo.');
    } finally {
      setUploadingMedia(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nome</label>
          <input
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Descrição</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Techs (separadas por vírgula)
          </label>
          <input
            value={form.techs}
            onChange={(e) => update('techs', e.target.value)}
            placeholder="React, NestJS, MySQL"
            className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Link ativo</label>
            <input
              value={form.liveLink}
              onChange={(e) => update('liveLink', e.target.value)}
              placeholder="https://..."
              className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Repositório</label>
            <input
              value={form.repoLink}
              onChange={(e) => update('repoLink', e.target.value)}
              placeholder="https://github.com/..."
              className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Categoria</label>
            <select
              value={form.categoriaId}
              onChange={(e) => update('categoriaId', e.target.value)}
              className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
            >
              <option value="">Sem categoria</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ordem</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => update('order', e.target.value)}
              className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
            />
          </div>
          <label className="flex items-center gap-2 self-end pb-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
              className="accent-brandBlue w-4 h-4"
            />
            Destacar
          </label>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-brandBlue text-white font-semibold text-sm hover:bg-sky-500 transition-all disabled:opacity-50"
          >
            {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : savedId ? 'Atualizar dados' : 'Criar projeto'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-borderCol text-slate-300 text-sm hover:text-white transition-all"
          >
            Fechar
          </button>
        </div>
      </form>

      {/* Upload de mídia — só disponível depois que o projeto tem um ID (criado ou em edição) */}
      <div className="pt-6 border-t border-borderCol space-y-4">
        <h4 className="text-xs font-semibold text-brandOrange uppercase tracking-wider">Mídia (fotos e vídeos)</h4>
        {!savedId ? (
          <p className="text-xs text-slate-500">Salve o projeto primeiro para poder enviar fotos e vídeos.</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="w-full text-xs text-slate-400"
                />
                <button
                  type="button"
                  onClick={handleUploadImagem}
                  disabled={!imageFile || uploadingMedia}
                  className="w-full px-4 py-2 rounded-lg border border-brandBlue/40 text-brandBlue text-xs font-semibold hover:bg-brandBlue hover:text-white transition-all disabled:opacity-40"
                >
                  Enviar foto
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                  className="w-full text-xs text-slate-400"
                />
                <button
                  type="button"
                  onClick={handleUploadVideo}
                  disabled={!videoFile || uploadingMedia}
                  className="w-full px-4 py-2 rounded-lg border border-brandOrange/40 text-brandOrange text-xs font-semibold hover:bg-brandOrange hover:text-white transition-all disabled:opacity-40"
                >
                  Enviar vídeo
                </button>
              </div>
            </div>
            {mediaMsg && <p className="text-xs text-slate-400">{mediaMsg}</p>}
            {((projeto?.images?.length ?? 0) > 0 || (projeto?.videos?.length ?? 0) > 0) && (
              <div className="flex flex-wrap gap-2 pt-2">
                {projeto?.images?.map((src) => (
                  <img key={src} src={src} alt="" className="w-16 h-16 object-cover rounded-lg border border-borderCol" />
                ))}
                {projeto?.videos?.map((src) => (
                  <div key={src} className="w-16 h-16 rounded-lg border border-borderCol bg-darkBg flex items-center justify-center text-slate-500">
                    <i className="fa-solid fa-video text-xs" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
