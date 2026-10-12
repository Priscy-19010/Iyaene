const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { validateContactMessage } = require('../middleware/validateContactMessage');
const { checkHoneypot } = require('../middleware/honeypotMiddleware');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { messageLimiter } = require('../middleware/rateLimiters');
const { validateObjectId } = require('../middleware/validateObjectId');


// Public: the contact form
router.post('/', messageLimiter, checkHoneypot, validateContactMessage, messageController.create);

// Admin only
router.get('/', protect, adminOnly, messageController.getAll);
router.patch('/:id', protect, adminOnly, validateObjectId, messageController.updateStatus);

module.exports = router;