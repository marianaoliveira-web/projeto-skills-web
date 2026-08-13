```markdown
# 🚀 Skills App (Frontend Web)

Bem-vindo ao repositório Frontend Web do **Projeto de Skills**, desenvolvido como parte de um desafio técnico para um processo seletivo.

Esta aplicação foi desenvolvida em **React com Vite**, oferecendo uma interface moderna, responsiva e intuitiva para que os usuários possam gerenciar suas competências profissionais, controlar níveis de conhecimento e interagir com a API RESTful do sistema.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **Biblioteca:** React (com Vite para alta performance)
* **Gerenciamento de Rotas:** React Router DOM (com proteção de rotas privadas)
* **Comunicação HTTP:** Axios (para integração com o Backend Spring Boot)
* **Estilização:** CSS Modules (garantindo escopo isolado e sem conflitos de classes)
* **Gerenciamento de Estado & Persistência:** React Hooks (`useState`, `useEffect`) e `localStorage`
* **Gerenciador de Dependências:** npm

---

## 💻 Funcionalidades da Aplicação Web

O projeto foi construído atendendo rigorosamente a todos os requisitos do desafio:

1. **Tela de Login:**
   * Campos de e-mail/login e senha.
   * Botão de alternar visibilidade da senha (olhinho).
   * Checkbox de **"Gravar Senha"**: Armazena os dados de acesso no `localStorage` para preenchimento automático no próximo acesso (e limpa caso desmarcado).
   * Redirecionamento automático para a Home após autenticação bem-sucedida.

2. **Tela de Cadastro:**
   * Campos de login, senha e confirmação de senha com validação em tempo real de igualdade.
   * Feedback visual de cadastro realizado com sucesso.

3. **Tela Home (Painel do Usuário):**
   * **Cabeçalho Dinâmico (AuthHeader / Header):** Identidade visual unificada com degradê corporativo, exibição da saudação personalizada e botão de Logout.
   * **Dark Mode Nativo:** Alternância completa entre tema claro e escuro com persistência de preferência do usuário.
   * **Listagem de Skills:** Exibição em cards modernos contendo imagem/logo oficial, nome da skill, descrição e nível atual.
   * **CRUD Completo de Habilidades do Usuário:**
     * **Adicionar Skill:** Botão que abre um modal interativo contendo uma combo (select) populada diretamente pelo endpoint de catálogo da API, permitindo associar novos conhecimentos.
     * **Editar Nível:** Alteração dinâmica do *level* diretamente na interface.
     * **Excluir Skill:** Remoção de habilidades associadas com confirmação.

---

## 🔒 Segurança e Consistência Visual

* **Autenticação Baseada em Token (JWT):** O token retornado no login é armazenado de forma segura e injetado automaticamente pelo Axios em todas as requisições protegidas às rotas de *Skills*.
* **Design System & UX:** Utilização de variáveis globais (`global.css`), efeitos de vidro fosco (*glassmorphism*), sombras suaves e paleta de cores oficial da marca para garantir uma experiência de usuário de nível corporativo.

---

## ⚙️ Como executar o projeto localmente

### Pré-requisitos
* **Node.js** (versão 18 ou superior recomendada) instalado.
* O **Backend** do projeto (`projeto-skills-backend`) deve estar rodando localmente na porta `8080`.

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/marianaoliveira-web/projeto-skills-web.git

```

2. **Instale as dependências**
Abra o terminal na pasta raiz do projeto web e execute:
```bash
npm install

```


3. **Configure a URL da API (se necessário)**
Verifique o arquivo de configuração do Axios em `src/services/api.ts` para garantir que ele aponta para o endereço correto do backend:
```javascript
baseURL: 'http://localhost:8080'

```


4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev

```



A aplicação web estará acessível no seu navegador através do endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## 📍 Rotas da Aplicação

| Rota | Componente | Descrição | Acesso |
| --- | --- | --- | --- |
| `/login` | `Login.jsx` | Página de autenticação do usuário. | Público |
| `/cadastro` | `Cadastro.jsx` | Página de registro de novos usuários. | Público |
| `/home` | `Home.jsx` | Painel principal de gerenciamento de skills. | Privado (Exige Token JWT) |

---

Desenvolvido com dedicação por **Mariana Alves de Oliveira** 💻✨