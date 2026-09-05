import axios from 'axios';
import type {
  Categoria,
  LoginCredenciais,
  LoginResponse,
  Mensagem,
  Projeto,
  ProjetosResponse,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = axios.create({ baseURL: API_URL });

// Anexa o token automaticamente. Importante: o backend já retorna o token
// PRONTO com o prefixo "Bearer " embutido (ver AuthService.login), então
// aqui só repassamos o valor salvo, sem concatenar "Bearer " de novo.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_token');
  if (token) config.headers.Authorization = token;
  return config;
});

// --- Projetos ---
export interface ProjetosParams {
  page?: number;
  limit?: number;
  categoriaId?: number | string;
  featured?: string;
  tech?: string;
}

export const getProjetos = (params: ProjetosParams = {}) =>
  api.get<ProjetosResponse>('/projetos', { params });

export const getProjetoById = (id: number | string) => api.get<Projeto>(`/projetos/${id}`);

export const createProjeto = (data: Partial<Projeto>) => api.post<Projeto>('/projetos', data);

export const updateProjeto = (data: Partial<Projeto> & { id: number }) =>
  api.put<Projeto>('/projetos', data);

export const deleteProjeto = (id: number | string) => api.delete(`/projetos/${id}`);

export const uploadProjetoImagem = (id: number | string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post(`/projetos/${id}/imagem`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const uploadProjetoVideo = (id: number | string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post(`/projetos/${id}/video`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// --- Categorias ---
export const getCategorias = () => api.get<Categoria[]>('/categorias');

export const createCategoria = (data: Partial<Categoria>) =>
  api.post<Categoria>('/categorias', data);

export const updateCategoria = (data: Partial<Categoria> & { id: number }) =>
  api.put<Categoria>('/categorias', data);

export const deleteCategoria = (id: number | string) => api.delete(`/categorias/${id}`);

// --- Auth ---
export const login = (credenciais: LoginCredenciais) =>
  api.post<LoginResponse>('/auth/login', credenciais);

// --- Contato ---
export interface ContatoPayload {
  nome: string;
  email: string;
  mensagem: string;
}

export const enviarContato = (data: ContatoPayload) => api.post('/contato', data);

export const getMensagens = () => api.get<Mensagem[]>('/contato');

export const marcarMensagemLida = (id: number | string) => api.put(`/contato/${id}/lida`);

export interface GithubStats {
  totalRepos: number;
  totalCommits: number;
  coffees: number;
}

export const getGithubStats = () => api.get<GithubStats>('/github-stats');

export default api;
