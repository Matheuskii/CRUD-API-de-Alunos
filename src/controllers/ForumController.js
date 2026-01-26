const Forum = require('../models/Forum');

const ForumController = {
    // Listar Tópicos
    index: async (req, res) => {
        try {
            const topics = await Forum.getAllTopics();
            res.json(topics);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar tópicos" });
        }
    },

    // Criar Tópico
    store: async (req, res) => {
        try {
            const { titulo, conteudo } = req.body;
            const usuario_id = req.user.id; // Vem do token JWT

            if (!titulo || !conteudo) {
                return res.status(400).json({ msg: "Preencha título e conteúdo" });
            }

            await Forum.createTopic(titulo, conteudo, usuario_id);
            res.status(201).json({ msg: "Tópico criado com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao criar tópico" });
        }
    },

    // Ver um tópico único e suas respostas
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const topic = await Forum.getTopicById(id);

            if (!topic) return res.status(404).json({ msg: "Tópico não encontrado" });

            const replies = await Forum.getRepliesByTopic(id);

            res.json({ ...topic, replies });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar detalhe do tópico" });
        }
    },

    // Responder a um tópico
    reply: async (req, res) => {
        try {
            const { id } = req.params; // ID do tópico
            const { conteudo } = req.body;
            const usuario_id = req.user.id;

            if (!conteudo) {
                return res.status(400).json({ msg: "Preencha o conteúdo da resposta" });
            }

            await Forum.createReply(conteudo, id, usuario_id);
            res.status(201).json({ msg: "Resposta enviada" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao responder" });
        }
    }
};

module.exports = ForumController;
