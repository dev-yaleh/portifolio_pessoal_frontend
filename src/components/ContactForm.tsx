import { useState, type FormEvent } from 'react';
import { enviarContato } from '../api/api';
import type { ContatoPayload } from '../api/api';
import { Reveal } from './Reveal';

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
    <section
      id="contato"
      className="relative isolate scroll-mt-20 overflow-hidden border-b border-borderCol bg-darkBg px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-48 top-0 h-[32rem] w-[32rem] rounded-full bg-brandOrange/[0.07] blur-[150px]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />
      </div>

      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
          <span><span className="text-brandOrange">04</span> / CONTATO</span>
          <span className="hidden sm:inline">Disponível para novas conversas</span>
        </Reveal>

        <div className="grid gap-12 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20">
          <Reveal from="left" className="lg:col-span-6">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
              Uma boa conversa pode virar um grande projeto
            </p>
            <h2 className="font-display text-[clamp(3.25rem,8.2vw,8rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
              Vamos<br />
              <span className="text-brandBlue">criar</span><br />
              juntos<span className="text-brandOrange">?</span>
            </h2>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-slate-300 sm:mt-10 sm:text-lg">
              Tem um projeto em mente ou uma oportunidade? Envie uma mensagem pelo formulário ou fale comigo diretamente. Estou aberta a conversar sobre ideias, desafios e novas possibilidades.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3" aria-label="Redes sociais">
              <a
                href="https://github.com/dev-yaleh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Yaleh Nóbrega"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-slate-300 transition hover:border-brandBlue hover:text-brandBlue focus-ring"
              >
                <i className="fa-brands fa-github" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/yalehnobrega/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Yaleh Nóbrega"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-slate-300 transition hover:border-brandBlue hover:text-brandBlue focus-ring"
              >
                <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
              </a>
              <a
                href="mailto:dev.yaleh@gmail.com"
                aria-label="Enviar e-mail para Yaleh Nóbrega"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-slate-300 transition hover:border-brandOrange hover:text-brandOrange focus-ring"
              >
                <i className="fa-regular fa-envelope" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500 sm:text-[10px]">
              <a href="https://share.google/VlIuDgeEKFE90sIGu" className="transition hover:text-brandOrange">
                Santos, SP · Brasil
              </a>
            </div>
          </Reveal>

          <Reveal from="up" delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <div className="border-t border-white/20 py-6 sm:py-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brandOrange sm:text-[10px]">Formulário de contato</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">Escreva sua mensagem.</h3>
                </div>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">01—03</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">Nome</label>
                    <input
                      id="contact-name"
                      name="nome"
                      autoComplete="name"
                      required
                      value={form.nome}
                      onChange={(e) => update('nome', e.target.value)}
                      className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">E-mail</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none"
                      placeholder="voce@exemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">Mensagem</label>
                  <textarea
                    id="contact-message"
                    name="mensagem"
                    required
                    rows={3}
                    value={form.mensagem}
                    onChange={(e) => update('mensagem', e.target.value)}
                    className="w-full resize-y border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none"
                    placeholder="Conte um pouco sobre o que você tem em mente..."
                  />
                </div>

                {feedback && (
                  <p role="status" aria-live="polite" className={`text-sm ${status === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {feedback}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group flex w-full items-center justify-between border border-brandBlue/50 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-brandBlue hover:text-darkBg disabled:cursor-wait disabled:opacity-50 focus-ring sm:w-auto sm:min-w-64"
                >
                  <span>{status === 'sending' ? 'Enviando mensagem...' : 'Enviar mensagem'}</span>
                  <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">↗</span>
                </button>
                <div className="border-t border-white/15 pt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500 sm:text-[10px]">
                  Retorno em até 48h
                </div>
                
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

