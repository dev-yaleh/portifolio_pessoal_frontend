import { useState, type FormEvent } from 'react';
import { enviarContato } from '../api/api';
import type { ContatoPayload } from '../api/api';
import { SectionTitle } from './Reveal';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState<ContatoPayload>({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  function update(field: keyof ContatoPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setFeedback('');
    try {
      const { data } = await enviarContato(form);
      setStatus('ok');
      setFeedback((data as { message?: string })?.message || 'Mensagem enviada com sucesso!');
      setForm({ nome: '', email: '', mensagem: '' });
    } catch (err: any) {
      setStatus('error');
      setFeedback(
        err.response?.data?.message ||
          'Não foi possível enviar sua mensagem agora. Tente novamente em instantes.'
      );
    }
  }

  return (
    <section id="contato" className="py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Contato" title="Vamos conversar?" />
        <p className="text-slate-400 -mt-8 mb-10 text-center font-light">
          Tem um projeto em mente ou uma oportunidade? Me manda uma mensagem.
        </p>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl border border-borderCol p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Nome
            </label>
            <input
              required
              value={form.nome}
              onChange={(e) => update('nome', e.target.value)}
              className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              E-mail
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Mensagem
            </label>
            <textarea
              required
              rows={5}
              value={form.mensagem}
              onChange={(e) => update('mensagem', e.target.value)}
              className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring resize-none"
              placeholder="Conte um pouco sobre o que você tem em mente..."
            />
          </div>

          {feedback && (
            <p className={`text-sm ${status === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>{feedback}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-6 py-3.5 rounded-xl bg-brandBlue text-white font-semibold shadow-lg shadow-brandBlue/20 hover:bg-sky-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'sending' ? (
              'Enviando...'
            ) : (
              <>
                <i className="fa-solid fa-paper-plane" /> Enviar mensagem
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
