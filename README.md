# Portfólio Pessoal — Frontend

Frontend em **React + Vite + Tailwind CSS v4** (seguindo o [cookbook_java_fullstack](https://github.com/conteudoGeneration/cookbook_java_fullstack/blob/main/05_react/07.md) para a instalação do Tailwind), com a paleta de cores do seu banner (azul `#00a2ff`, laranja `#e0682b`, fundo escuro `#070c18`), inspirado no layout do [tech-guard-frontend](https://tech-guard-frontend.vercel.app/) e no HTML de referência que você enviou. Conectado à API real em produção: `https://portifolio-pessoal-backend.onrender.com`.

> ⚠️ **Sobre o Tailwind v4**: diferente da v3, não existe mais `tailwind.config.js` nem `postcss.config.js` para esse setup básico. O plugin `@tailwindcss/vite` é registrado direto no `vite.config.js`, e a paleta de cores customizada (`darkBg`, `cardBg`, `brandBlue`, etc.) é definida via `@theme` dentro do próprio `src/index.css` — é lá que você mexe se quiser ajustar as cores no futuro.

## O que tem pronto

**Página pública (`/`)**
- Hero com estatísticas (total de projetos, badge de status da API)
- Seção "Sobre"
- Grade de projetos com **filtro por categoria, destaque e tecnologia + paginação** (usa o endpoint paginado `GET /projetos`)
- Modal de projeto com galeria de fotos/vídeos, links ativo/repositório e contador de visualizações
- Seção de tech stack
- Formulário de contato (`POST /contato`)

**Área administrativa (`/admin`)**
- Login (`POST /auth/login`) — token salvo no `localStorage`, já injetado automaticamente em toda requisição protegida
- Aba **Projetos**: criar, editar, remover, e upload de fotos/vídeos por projeto
- Aba **Categorias**: CRUD completo
- Aba **Mensagens**: lista as mensagens de contato recebidas e permite marcar como lida

## Rodando localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Para conferir se o Tailwind v4 foi instalado corretamente (mesma checagem do cookbook):

```bash
npm list tailwindcss
```

Por padrão, o `.env.example` já aponta para a API em produção no Render (`VITE_API_URL=https://portifolio-pessoal-backend.onrender.com`). Se quiser testar contra o backend rodando localmente, troque para `http://localhost:4000`.

O site sobe em `http://localhost:5173`.

## ⚠️ Pontos de atenção para revisar/ajustar

1. **Nome do campo de upload de arquivo.** As funções `uploadProjetoImagem`/`uploadProjetoVideo` (em `src/api/api.js`) enviam o arquivo em um `FormData` com a chave `'file'`, apontando para `POST /projetos/:id/imagem` e `POST /projetos/:id/video` (rotas que apareceram no seu log do Docker). Confira no seu `ProjetosController` qual é o nome exato do campo esperado pelo `@UseInterceptors(FileInterceptor('...'))` — se for diferente de `'file'` (ex: `'imagem'`, `'arquivo'`), ajuste a chave do `formData.append(...)` nesse arquivo.

2. **Formato da resposta paginada.** O frontend já trata os dois formatos possíveis de `GET /projetos` — array simples OU objeto `{ dados, total, page, limit, totalPages }` — então funciona nos dois casos. Se você alterar esse contrato no backend no futuro, ajuste `ProjectsSection.jsx` e `AdminDashboard.jsx` (função `load` da aba Projetos).

3. **Token já vem com `Bearer ` embutido.** O `AuthService.login()` do seu backend retorna `token: "Bearer eyJ..."` pronto. O interceptor do axios (`src/api/api.js`) já repassa esse valor direto no header `Authorization`, sem concatenar `Bearer` de novo — não mude isso, ou as requisições protegidas vão quebrar.

4. **CORS.** Confirme que o backend está com `app.enableCors()` liberado (ou pelo menos permitindo o domínio onde esse frontend for hospedado — Vercel, Netlify, etc.), senão as requisições vão ser bloqueadas pelo navegador.

5. **Cadastro de categorias antes de projetos.** Como no fluxo do backend, para um projeto aparecer vinculado a uma categoria no filtro da home, cadastre as categorias primeiro na aba Categorias do admin.

## Deploy

Qualquer plataforma de hospedagem estática funciona (Vercel, Netlify, Cloudflare Pages):

```bash
npm run build
```

Gera a pasta `dist/` pronta para publicar. Configure a variável de ambiente `VITE_API_URL` no painel da plataforma escolhida, apontando para `https://portifolio-pessoal-backend.onrender.com`.

> ⚠️ O plano gratuito do Render "dorme" o backend após um tempo sem uso — a primeira requisição depois disso pode demorar ~30-50s para responder (ele precisa "acordar"). Isso é normal e não é um bug do frontend.
