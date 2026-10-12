const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const { validateQuoteRequest } = require('../middleware/validateQuoteRequest');
const { checkHoneypot } = require('../middleware/honeypotMiddleware');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { quoteLimiter } = require('../middleware/rateLimiters');
const { validateObjectId } = require('../middleware/validateObjectId');

// Public: the quote form on your website
router.post('/', quoteLimiter, checkHoneypot, validateQuoteRequest, quoteController.create);

// Admin only: the dashboard
router.get('/', protect, adminOnly, quoteController.getAll);
router.patch('/:id', protect, adminOnly, validateObjectId, quoteController.updateStatus);

module.exports = router;