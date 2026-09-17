const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { validateContactMessage } = require('../middleware/validateContactMessage');
const { checkHoneypot } = require('../middleware/honeypotMiddleware');

router.post('/', checkHoneypot, validateContactMessage, messageController.create);
router.get('/', messageController.getAll);
router.patch('/:id', messageController.updateStatus);

module.exports = router;