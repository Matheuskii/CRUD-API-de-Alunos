const db = require('../config/db');

const Student = {
    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM alunos");
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query(`SELECT * FROM alunos WHERE id = ?`, [id]);
        return rows[0];
    },
    create: async (data) => {
        // Map legacy fields and extract new ones
        const { nome, cpf, rg, data_nascimento, email, telefone, cep, uf, cidade, bairro, rua, logradouro, numero, complemento, status, observacoes } = data;

        // Use logradouro if provided, otherwise fallback to rua
        const finalLogradouro = logradouro || rua;

        const sql = `
            INSERT INTO alunos (
                nome, data_nascimento, cpf, rg, email, telefone, 
                cep, logradouro, numero, complemento, bairro, cidade, uf, 
                status, observacoes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            nome, data_nascimento || null, cpf, rg || null, email || null, telefone || null,
            cep, finalLogradouro, numero, complemento, bairro || null, cidade || null, uf,
            status || 'ativo', observacoes || null
        ];

        const [result] = await db.execute(sql, params);
        return result;
    },
    delete: async (id) => {
        const [result] = await db.execute("DELETE FROM alunos WHERE id = ?", [id]);
        return result;
    },
    update: async (id, data) => {
        const { nome, cpf, rg, data_nascimento, email, telefone, cep, uf, cidade, bairro, rua, logradouro, numero, complemento, status, observacoes } = data;

        const finalLogradouro = logradouro || rua;

        const sql = `UPDATE alunos 
                     SET nome=?, data_nascimento=?, cpf=?, rg=?, email=?, telefone=?, 
                         cep=?, logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, uf=?, 
                         status=?, observacoes=?
                     WHERE id=?`;

        const params = [
            nome, data_nascimento || null, cpf, rg || null, email || null, telefone || null,
            cep, finalLogradouro, numero, complemento, bairro || null, cidade || null, uf,
            status || 'ativo', observacoes || null,
            id
        ];

        const [result] = await db.execute(sql, params);
        return result;
    }
};

module.exports = Student;
