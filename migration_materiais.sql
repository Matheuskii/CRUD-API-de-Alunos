ALTER TABLE materiais ADD COLUMN conteudo LONGTEXT;
ALTER TABLE materiais ADD COLUMN categoria VARCHAR(100) DEFAULT 'Geral';
-- Tipos esperados na coluna 'tipo': 'LINK', 'PDF', 'VIDEO', 'LICAO', 'QUIZ'
