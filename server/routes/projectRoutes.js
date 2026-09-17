const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { validateProject } = require('../middleware/validateProject');
const upload = require('../middleware/uploadMiddleware');

router.get('/', projectController.getPublished);
router.get('/all', projectController.getAll);
router.post('/upload', upload.single('image'), projectController.uploadImage);
router.post('/', validateProject, projectController.create);
router.get('/:id', projectController.getOne);
router.patch('/:id', projectController.update);
router.delete('/:id', projectController.remove);

module.exports = router;