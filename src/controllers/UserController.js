const User = require('../models/User');

const UserController = {
    index: async (req, res) => {
        try {
            // Em aplicação real, validar se req.user.cargo === 'admin'
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar usuários" });
        }
    },

    updateRole: async (req, res) => {
        try {
            const { id } = req.params;
            const { cargo } = req.body; // 'admin', 'secretaria', 'professor', 'aluno'

            if (!['admin', 'secretaria', 'professor', 'aluno'].includes(cargo)) {
                return res.status(400).json({ msg: "Cargo inválido" });
            }

            await User.updateRole(id, cargo);
            res.json({ msg: "Cargo atualizado com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao atualizar cargo" });
        }
    }
};

module.exports = UserController;
