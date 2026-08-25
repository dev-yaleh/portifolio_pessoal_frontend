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
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl border border-borderCol p-8 w-full max-w-sm glow-blue">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-tr from-brandBlue to-brandOrange p-0.5 mb-4">
            <div className="w-full h-full bg-darkBg rounded-[10px] flex items-center justify-center">
              <i className="fa-solid fa-lock text-brandBlue" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-white">Área Restrita</h1>
          <p className="text-sm text-slate-400 mt-1">Acesso ao painel de gerenciamento</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Usuário
            </label>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Senha
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-darkBg border border-borderCol rounded-xl px-4 py-3 text-slate-200 focus-ring"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3.5 rounded-xl bg-brandBlue text-white font-semibold shadow-lg shadow-brandBlue/20 hover:bg-sky-500 transition-all disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
