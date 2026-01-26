const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, StudentController.getAll);
router.get('/:id', auth, StudentController.getById);
router.post('/', auth, StudentController.create);
router.put('/:id', auth, StudentController.update);
router.delete('/:id', auth, StudentController.delete);

module.exports = router;
