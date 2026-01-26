const db = require('../config/db');

const Forum = {
    // Tópicos
    createTopic: async (titulo, conteudo, usuario_id) => {
        const [result] = await db.execute(
            'INSERT INTO forum_topicos (titulo, conteudo, usuario_id) VALUES (?, ?, ?)',
            [titulo, conteudo, usuario_id]
        );
        return result;
    },
    getAllTopics: async () => {
        // Traz tópicos com nome do autor
        const sql = `
            SELECT t.*, u.nome as autor_nome 
            FROM forum_topicos t
            LEFT JOIN usuarios u ON t.usuario_id = u.id
            ORDER BY t.criado_em DESC
        `;
        const [rows] = await db.query(sql);
        return rows;
    },
    getTopicById: async (id) => {
        const sql = `
            SELECT t.*, u.nome as autor_nome 
            FROM forum_topicos t
            LEFT JOIN usuarios u ON t.usuario_id = u.id
            WHERE t.id = ?
        `;
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    },

    // Respostas
    createReply: async (conteudo, topico_id, usuario_id) => {
        const [result] = await db.execute(
            'INSERT INTO forum_respostas (conteudo, topico_id, usuario_id) VALUES (?, ?, ?)',
            [conteudo, topico_id, usuario_id]
        );
        return result;
    },
    getRepliesByTopic: async (topico_id) => {
        const sql = `
            SELECT r.*, u.nome as autor_nome 
            FROM forum_respostas r
            LEFT JOIN usuarios u ON r.usuario_id = u.id
            WHERE r.topico_id = ?
            ORDER BY r.criado_em ASC
        `;
        const [rows] = await db.query(sql, [topico_id]);
        return rows;
    }
};

module.exports = Forum;
