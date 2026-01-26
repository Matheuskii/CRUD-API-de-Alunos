DROP DATABASE IF EXISTS escola_db;
CREATE DATABASE escola_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE escola_db;

-- Tabela de Usuários (Login)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cargo ENUM('admin', 'secretaria', 'professor', 'aluno') DEFAULT 'aluno',
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Tabela de Alunos (Dados Cadastrais Detalhados)
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT, -- Vinculo com login
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    cpf CHAR(11),
    rg VARCHAR(20),
    email VARCHAR(100),
    telefone VARCHAR(20),
    
    -- Endereço
    cep CHAR(8),
    logradouro VARCHAR(150),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2),
    
    status ENUM('ativo', 'inativo', 'trancado', 'formado') DEFAULT 'ativo',
    observacoes TEXT,
    
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_cpf (cpf)
);

-- Tabela para o Fórum (Tópicos)
CREATE TABLE forum_topicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    conteudo TEXT NOT NULL,
    usuario_id INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabela para o Fórum (Respostas)
CREATE TABLE forum_respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conteudo TEXT NOT NULL,
    topico_id INT NOT NULL,
    usuario_id INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topico_id) REFERENCES forum_topicos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabela para Materiais Didáticos
CREATE TABLE materiais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    link_arquivo VARCHAR(255),
    tipo VARCHAR(50), -- PDF, VIDEO, LINK, LICAO, QUIZ
    conteudo LONGTEXT, -- Para lições ou quizzes gerados
    categoria VARCHAR(100) DEFAULT 'Geral',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para Mensagens do Chat (Global/Sala)
CREATE TABLE mensagens_chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    mensagem TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserir Usuário Admin Padrão
INSERT INTO usuarios (nome, email, senha, cargo) VALUES 
('Administrador', 'admin@admin.com', '$2b$10$7mKOjxbVw59sv0n7WTEDeO5mTyOJQdwYKY8RiOukwKWm2ahjrden2', 'admin');

-- Inserir Alunos de Exemplo (Vinculados a usuarios se desejar, aqui apenas cadastro solto para teste visual)
INSERT INTO alunos (nome, email, status, cidade, uf) VALUES
('João da Silva', 'joao@email.com', 'ativo', 'São Paulo', 'SP'),
('Maria Oliveira', 'maria@email.com', 'ativo', 'Rio de Janeiro', 'RJ');