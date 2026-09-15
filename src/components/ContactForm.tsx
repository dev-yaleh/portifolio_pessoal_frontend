import { useState, type FormEvent } from 'react';
import { enviarContato } from '../api/api';
import type { ContatoPayload } from '../api/api';
import { SectionHeading } from './Reveal';


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
    <section id="contato" className="relative py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14">
          <SectionHeading eyebrow="[ 04 ] Contato" title="Vamos" highlight="conversar?"/>
          <p className="text-slate-400 mt-3 font-light max-w-max">
            Tem um projeto em mente ou uma oportunidade? Me manda uma mensagem.
          </p>
        </div>

        {/* Grid principal: formulário à esquerda, informações à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Coluna do formulário */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-card rounded-2xl border border-borderCol p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Nome
                </label>
                <input
                  required
                  value={form.nome}
                  onChange={(e) => update('nome', e.target.value)}
                  className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
                  placeholder="Nome Completo"
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
                placeholder="Escreva sua mensagem aqui..."
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

          {/* Coluna de informações */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-card rounded-2xl border border-borderCol p-8.5 space-y-5">
              <h3 className="font-mono text-sm text-brandBlue uppercase tracking-wider">
                Canais diretos
              </h3>

              {/* Links de contato: LinkedIn, GitHub e email, com ícones e hover effects. Cada link é um <a> com target="_blank" para abrir em nova aba. */}
              <a
                href="https://www.linkedin.com/in/yalehnobrega/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="w-11 h-11 rounded-xl bg-brandBlue/10 border border-brandBlue/30 flex items-center justify-center text-brandBlue group-hover:bg-brandBlue group-hover:text-white transition-all shrink-0">
                  <i className="fa-brands fa-linkedin" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">LinkedIn</p>
                  <p className="text-slate-200 text-sm truncate group-hover:text-brandBlue transition-colors">
                    Yaleh Nóbrega
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/dev-yaleh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="w-11 h-11 rounded-xl bg-brandOrange/10 border border-brandOrange/30 flex items-center justify-center text-brandOrange group-hover:bg-brandOrange group-hover:text-white transition-all shrink-0">
                  <i className="fa-brands fa-github" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">GitHub</p>
                  <p className="text-slate-200 text-sm truncate group-hover:text-brandOrange transition-colors">
                    dev-yaleh
                  </p>
                </div>
              </a>

              <a
                href="mailto:dev.yaleh@gmail.com"
                className="flex items-center gap-4 group"
              >            
                <span className="w-11 h-11 rounded-xl bg-brandBlue/10 border border-brandBlue/30 flex items-center justify-center text-brandBlue group-hover:bg-brandBlue group-hover:text-white transition-all shrink-0">
                  <i className="fa-solid fa-envelope" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">E-mail</p>
                  <p className="text-slate-200 text-sm truncate group-hover:text-brandBlue transition-colors">
                    dev.yaleh@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://share.google/VlIuDgeEKFE90sIGu"
                className="flex items-center gap-4 group"
              >
                <span className="w-11 h-11 rounded-xl bg-brandOrange/10 border border-brandOrange/30 flex items-center justify-center text-brandOrange group-hover:bg-brandOrange group-hover:text-white transition-all shrink-0">
                  <i className="fa-solid fa-location-dot" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Localização</p>
                  <p className="text-slate-200 text-sm truncate group-hover:text-brandOrange transition-colors">
                    Santos, SP, Brasil
                  </p>
                </div>
              </a>
            
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <i className="fa-solid fa-clock" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Disponibilidade</p>
                  <p className="text-slate-200 text-sm">Respondo em até 48h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}