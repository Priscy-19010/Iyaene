const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { validateProject, validateProjectUpdate } = require('../middleware/validateProject');
const { validateObjectId } = require('../middleware/validateObjectId');
const { uploadSingleImage } = require('../middleware/uploadMiddleware');

// Public.
router.get('/', projectController.getPublished);

// Admin only. 
router.get('/all', protect, adminOnly, projectController.getAll);
router.post('/upload', protect, adminOnly, uploadSingleImage, projectController.uploadImage);
router.post('/', protect, adminOnly, validateProject, projectController.create);

// Public: view one project
router.get('/:id', validateObjectId, projectController.getOne);

// Admin only
router.patch('/:id', protect, adminOnly, validateObjectId, validateProjectUpdate, projectController.update);
router.delete('/:id', protect, adminOnly, validateObjectId, projectController.remove);

module.exports = router;