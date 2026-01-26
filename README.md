# 🎓 Sistema de Gerenciamento Escolar (CRUD de Alunos)

Um sistema completo para gerenciamento de alunos, materiais didáticos e fórum de discussões. Este projeto conta com um backend robusto em Node.js e um frontend moderno e responsivo construído com React.

---

## 🚀 Tecnologias Utilizadas

### **Backend**
- **Node.js** & **Express**
- **MySQL** (Banco de dados relacional)
- **Socket.io** (Chat em tempo real)
- **JWT** (Autenticação segura)
- **Bcrypt.js** (Criptografia de senhas)
- **Dotenv** (Gerenciamento de variáveis de ambiente)

### **Frontend**
- **React 19** & **Vite**
- **Tailwind CSS** (Estilização premium)
- **Framer Motion** (Animações fluidas)
- **Lucide React** (Ícones modernos)
- **Axios** (Consumo de API)
- **React Router Dom** (Navegação)

---

## ✨ Funcionalidades

- 🔒 **Sistema de Login/Registro**: Autenticação segura com cargos (Admin, Professor, Aluno).
- 👨‍🎓 **Gestão de Alunos**: CRUD completo (Criar, Ler, Atualizar, Deletar) com endereços automáticos.
- 📚 **Materiais Didáticos**: Compartilhamento de PDFs, Vídeos, Links e lições interativas.
- 💬 **Fórum de Discussão**: Criação de tópicos e respostas para interação entre alunos e professores.
- 🗨️ **Chat Global**: Chat em tempo real usando WebSockets.
- 🎨 **Design Moderno**: Interface em modo dark, glassmorphism e micro-animações.

---

## 🛠️ Como Iniciar o Projeto

### **Pré-requisitos**
- Node.js instalado
- MySQL instalado e rodando

### **1. Configuração do Banco de Dados**
Importe o arquivo `banco.sql` no seu console/cliente MySQL ou execute o conteúdo via script:
```sql
-- O script criará a base 'escola_db' e todas as tabelas necessárias.
```

### **2. Instalação e Configuração**

Clone o repositório e instale as dependências:

**No Backend (Raíz):**
```bash
npm install
```

**No Frontend:**
```bash
cd frontend
npm install
```

### **3. Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=escola_db
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
PORT=3000
```

### **4. Executando o Projeto**

Abra dois terminais:

**Terminal 1 (Backend - Raiz):**
```bash
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## 🔐 Acesso Padrão

Para facilitar os testes, utilize as contas abaixo:

| Cargo | E-mail | Senha |
| :--- | :--- | :--- |
| **Administrador** | `admin@admin.com` | `123456` |
| **Estudante** | `aluno@escola.com` | `123456` |

---

## 📸 Estrutura do Projeto

- `/src`: Lógica do servidor, rotas, modelos e controladores.
- `/frontend`: Aplicação React com sistema de design moderno.
- `server.js`: Ponto de entrada da aplicação backend.
- `banco.sql`: Script de criação do banco de dados.

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar.

---

**Desenvolvido com ❤️ para facilitar a educação.**
