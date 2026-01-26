const express = require('express');
const router = express.Router();
const ForumController = require('../controllers/ForumController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas (ou privadas, depende da regra de negócio - vou deixar privadas pois é escola)
router.get('/', authMiddleware, ForumController.index);
router.get('/:id', authMiddleware, ForumController.show);

// Rotas de criação (precisa estar logado)
router.post('/', authMiddleware, ForumController.store);
router.post('/:id/reply', authMiddleware, ForumController.reply);

module.exports = router;
