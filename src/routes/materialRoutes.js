const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/MaterialController');
const authMiddleware = require('../middlewares/authMiddleware');

// Listar materiais (alunos e professores)
router.get('/', authMiddleware, MaterialController.index);

// Criar/Deletar (apenas alguns perfis deveriam, mas por enquanto vou proteger só com login, no futuro validar Cargo)
router.post('/', authMiddleware, MaterialController.store);
router.delete('/:id', authMiddleware, MaterialController.delete);

module.exports = router;
