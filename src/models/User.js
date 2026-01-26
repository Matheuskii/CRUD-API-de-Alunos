const db = require('../config/db');

const User = {
    create: async (nome, email, senha) => {
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        const [result] = await db.execute(sql, [nome, email, senha]);
        return result;
    },
    findByEmail: async (email) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    },
    findById: async (id) => {
        const sql = 'SELECT * FROM usuarios WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    },
    getAll: async () => {
        const sql = 'SELECT id, nome, email, cargo, ativo, criado_em FROM usuarios ORDER BY nome ASC';
        const [rows] = await db.query(sql);
        return rows;
    },
    updateRole: async (id, cargo) => {
        const sql = 'UPDATE usuarios SET cargo = ? WHERE id = ?';
        const [result] = await db.execute(sql, [cargo, id]);
        return result;
    }
};

module.exports = User;
