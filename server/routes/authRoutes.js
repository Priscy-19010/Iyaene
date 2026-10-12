const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Max 10 FAILED logins per IP per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts, please try again later' },
});

router.post('/login', loginLimiter, authController.login);
router.get('/me', protect, adminOnly, authController.me);

module.exports = router;