import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Não foi possível entrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-darkBg px-5 py-12 sm:px-8 lg:px-12 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-brandBlue/[0.07] blur-[150px]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      </div>

      <div className="mx-auto flex min-h-0 max-w-[1500px] flex-col">
        <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
          <span><span className="text-brandOrange">YN</span> / PAINEL ADMINISTRATIVO</span>
          <a href="/" className="transition-colors hover:text-brandBlue">Voltar ao portfólio ↗</a>
        </div>

        <div className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-31">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
              Acesso reservado · 01 / 01
            </p>
            <h1 className="font-display text-[clamp(3.8rem,9vw,8.5rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
              Área<br />
              <span className="text-brandBlue">restrita</span><span className="text-brandOrange">.</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-slate-400 sm:mt-10 sm:text-lg">
              Entre com suas credenciais para acessar o painel de gerenciamento do portfólio.
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="mb-6 flex items-center justify-between border-y border-white/20 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:text-[10px]">
              <span>Identificação</span>
              <span className="text-brandBlue"><i className="fa-solid fa-lock" aria-hidden="true" /> &nbsp; Segura</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="admin-username" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400 sm:text-[10px]">
                  Usuário
                </label>
                <input
                  id="admin-username"
                  name="username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none"
                  placeholder="Seu usuário"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400 sm:text-[10px]">
                  Senha
                </label>
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-slate-600 focus:border-brandBlue focus:outline-none"
                  placeholder="Sua senha"
                />
              </div>

              {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-between border border-brandBlue/50 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-brandBlue hover:text-darkBg disabled:cursor-wait disabled:opacity-50 focus-ring"
              >
                <span>{loading ? 'Entrando...' : 'Entrar no painel'}</span>
                <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">↗</span>
              </button>
            </form>

            <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
              Acesso exclusivo para administração
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
