const rateLimit = require('express-rate-limit');

// Each form gets its own counter, so using one form doesn't use up the other's allowance
const makeFormLimiter = () =>
  rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message: 'Too many submissions, please try again later' },
  });

exports.messageLimiter = makeFormLimiter();
exports.quoteLimiter = makeFormLimiter();
