// Tipos compartilhados entre componentes, páginas e a camada de API.
// Centralizar aqui evita repetir a mesma "forma" de objeto em vários arquivos.

export interface Categoria {
  id: number;
  name: string;
  description?: string;
}

export interface Projeto {
  id: number;
  name: string;
  description: string;
  techs?: string[];
  images?: string[];
  videos?: string[];
  liveLink?: string;
  repoLink?: string;
  featured?: boolean;
  order?: number;
  views?: number;
  categoria?: Categoria;
  createdAt?: string;
}

export interface Mensagem {
  id: number;
  nome: string;
  email: string;
  mensagem: string;
  lida: boolean;
  createdAt?: string;
}

// A API de listagem de projetos pode responder paginada ({ dados, total, totalPages })
// ou como um array simples — ver ProjectsSection e AdminDashboard.
export interface ProjetosPaginados {
  dados: Projeto[];
  total?: number;
  totalPages?: number;
}

export type ProjetosResponse = Projeto[] | ProjetosPaginados;

export interface LoginCredenciais {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

export interface AuthContextValue {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
