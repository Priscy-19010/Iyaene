const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const { validateQuoteRequest } = require('../middleware/validateQuoteRequest');
const { checkHoneypot } = require('../middleware/honeypotMiddleware');

router.post('/', checkHoneypot,validateQuoteRequest, quoteController.create);
router.get('/', quoteController.getAll);
router.patch('/:id', quoteController.updateStatus);

module.exports = router;