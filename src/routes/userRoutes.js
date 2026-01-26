const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, UserController.index);
router.put('/:id/role', authMiddleware, UserController.updateRole);

module.exports = router;
