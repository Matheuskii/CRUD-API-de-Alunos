const db = require('../config/db');

const Material = {
    create: async (titulo, descricao, link_arquivo, tipo, conteudo, categoria) => {
        const [result] = await db.execute(
            'INSERT INTO materiais (titulo, descricao, link_arquivo, tipo, conteudo, categoria) VALUES (?, ?, ?, ?, ?, ?)',
            [titulo, descricao, link_arquivo, tipo, conteudo, categoria]
        );
        return result;
    },
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM materiais ORDER BY criado_em DESC');
        return rows;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM materiais WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Material;
