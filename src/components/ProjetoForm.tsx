import { useState, type FormEvent } from 'react';
import {
  createProjeto,
  updateProjeto,
  uploadProjetoImagem,
  uploadProjetoVideo,
  getProjetoById,
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

  try {
    // Busca o estado atual de images/videos direto do backend,
    // pra não sobrescrever com array vazio ao salvar os campos de texto.
    let currentImages: string[] = projeto?.images ?? [];
    let currentVideos: string[] = projeto?.videos ?? [];
    if (savedId) {
      const { data } = await getProjetoById(savedId);
      currentImages = data.images ?? [];
      currentVideos = data.videos ?? [];
    }

    const payload = {
      name: form.name,
      description: form.description,
      techs: form.techs.split(',').map((t) => t.trim()).filter(Boolean),
      images: currentImages,
      videos: currentVideos,
      liveLink: form.liveLink,
      repoLink: form.repoLink,
      featured: form.featured,
      order: Number(form.order) || 0,
      ...(form.categoriaId ? { categoria: { id: Number(form.categoriaId) } } : {}),
    };

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
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-5">
          <div className="flex items-center gap-3 border-b border-white/15 pb-3">
            <span className="font-mono text-[9px] text-brandBlue">01 /</span>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Informações do projeto</h4>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="project-name" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Nome do projeto</label>
              <input id="project-name" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Ex.: Minha aplicação" className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none" />
            </div>
            <div>
              <label htmlFor="project-techs" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Tecnologias · separadas por vírgula</label>
              <input id="project-techs" value={form.techs} onChange={(e) => update('techs', e.target.value)} placeholder="React, NestJS, MySQL" className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none" />
            </div>
          </div>
          <div>
            <label htmlFor="project-description" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Descrição</label>
            <textarea id="project-description" required rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Apresente o objetivo e os principais recursos do projeto." className="w-full resize-y border-b border-white/20 bg-transparent px-0 py-3 text-sm leading-relaxed text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none" />
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center gap-3 border-b border-white/15 pb-3">
            <span className="font-mono text-[9px] text-brandOrange">02 /</span>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Links e organização</h4>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="project-live" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Link ativo</label>
              <input id="project-live" value={form.liveLink} onChange={(e) => update('liveLink', e.target.value)} placeholder="https://..." className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none" />
            </div>
            <div>
              <label htmlFor="project-repo" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Repositório</label>
              <input id="project-repo" value={form.repoLink} onChange={(e) => update('repoLink', e.target.value)} placeholder="https://github.com/..." className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none" />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="project-category" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Categoria</label>
              <select id="project-category" value={form.categoriaId} onChange={(e) => update('categoriaId', e.target.value)} className="w-full border-b border-white/20 bg-darkBg px-0 py-3 text-sm text-white focus:border-brandBlue focus:outline-none">
                <option value="">Sem categoria</option>
                {categorias.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="project-order" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Ordem de exibição</label>
              <input id="project-order" type="number" value={form.order} onChange={(e) => update('order', e.target.value)} className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white focus:border-brandBlue focus:outline-none" />
            </div>
            <label className="flex cursor-pointer items-center gap-3 self-end pb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-300">
              <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} className="h-4 w-4 accent-brandBlue" />
              Projeto em destaque
            </label>
          </div>
        </section>

        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

        <div className="flex flex-wrap gap-3 border-t border-white/15 pt-5">
          <button type="submit" disabled={saving} className="group inline-flex min-w-48 items-center justify-between gap-5 border border-brandBlue/50 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white transition hover:bg-brandBlue hover:text-darkBg disabled:cursor-wait disabled:opacity-50 focus-ring">
            {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : savedId ? 'Atualizar dados' : 'Criar projeto'}
            <span aria-hidden="true" className="text-base transition-transform group-hover:translate-x-1">↗</span>
          </button>
          <button type="button" onClick={onCancel} className="border border-white/15 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400 transition hover:border-white/40 hover:text-white focus-ring">Fechar</button>
        </div>
      </form>

      {/* Upload de mídia — só disponível depois que o projeto tem um ID (criado ou em edição) */}
      <section className="space-y-5 border-t border-white/15 pt-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-brandBlue">03 /</span>
          <h4 className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Imagens e vídeos</h4>
        </div>
        {!savedId ? (
          <p className="text-sm text-slate-500">Salve o projeto primeiro para liberar o envio de arquivos.</p>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-3 border-b border-white/10 pb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="w-full text-xs text-slate-400 file:mr-3 file:border-0 file:bg-white/5 file:px-3 file:py-2 file:font-mono file:text-[9px] file:uppercase file:tracking-wider file:text-slate-300"
                />
                <button
                  type="button"
                  onClick={handleUploadImagem}
                  disabled={!imageFile || uploadingMedia}
                  className="inline-flex items-center gap-2 border border-brandBlue/40 px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-brandBlue transition hover:bg-brandBlue hover:text-darkBg disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true" /> Enviar foto
                </button>
              </div>
              <div className="space-y-3 border-b border-white/10 pb-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                  className="w-full text-xs text-slate-400 file:mr-3 file:border-0 file:bg-white/5 file:px-3 file:py-2 file:font-mono file:text-[9px] file:uppercase file:tracking-wider file:text-slate-300"
                />
                <button
                  type="button"
                  onClick={handleUploadVideo}
                  disabled={!videoFile || uploadingMedia}
                  className="inline-flex items-center gap-2 border border-brandOrange/40 px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-brandOrange transition hover:bg-brandOrange hover:text-darkBg disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true" /> Enviar vídeo
                </button>
              </div>
            </div>
            {mediaMsg && <p role="status" className="text-sm text-slate-400">{mediaMsg}</p>}
            {((projeto?.images?.length ?? 0) > 0 || (projeto?.videos?.length ?? 0) > 0) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {projeto?.images?.map((src) => (
                  <img key={src} src={src} alt="" className="h-16 w-20 border border-white/15 object-cover" />
                ))}
                {projeto?.videos?.map((src) => (
                  <div key={src} className="flex h-16 w-20 items-center justify-center border border-white/15 bg-white/[0.03] text-slate-500">
                    <i className="fa-solid fa-video text-xs" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
