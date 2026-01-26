const Material = require('../models/Material');

const MaterialController = {
    index: async (req, res) => {
        try {
            const materials = await Material.getAll();
            res.json(materials);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar materiais" });
        }
    },

    store: async (req, res) => {
        try {
            // Apenas admins ou professores deveriam poder postar, mas vou validar isso na rota ou aqui
            // req.user.cargo poderia ser checado aqui.

            const { titulo, descricao, link_arquivo, tipo, conteudo, categoria } = req.body;

            // Validação básica: se for LINK/VIDEO precisa de link_arquivo, se for LICAO/QUIZ precisa de conteudo
            if (!titulo) {
                return res.status(400).json({ msg: "Título é obrigatório" });
            }

            await Material.create(titulo, descricao, link_arquivo, tipo || 'LINK', conteudo, categoria || 'Geral');
            res.status(201).json({ msg: "Material adicionado" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao adicionar material" });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await Material.delete(id);
            res.json({ msg: "Material removido" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao remover material" });
        }
    }
};

module.exports = MaterialController;
