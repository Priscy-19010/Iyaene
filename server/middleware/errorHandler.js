const multer = require('multer');

// Every error that reaches here came from: next(err), or an async route handler that threw
// (Express 5 forwards those automatically, so controllers don't need their own try/catch).
const errorHandler = (err, req, res, next) => {
  // Too late to send a clean error: let Express's built-in handler close the connection
  if (res.headersSent) return next(err);

  const fail = (status, message, extra = {}) =>
    res.status(status).json({ success: false, message, ...extra });

  // ---- Mistakes by the client: answer clearly (4xx). Not our bug, so not logged as an error. ----
  if (err.type === 'entity.parse.failed') return fail(400, 'Invalid JSON in request body');
  if (err.type === 'entity.too.large') return fail(413, 'Request body is too large');
  if (err instanceof multer.MulterError) return fail(400, err.message);
  if (err.message && err.message.includes('Only image files')) return fail(400, err.message);

  // Mongoose: a value broke a schema rule (missing field, bad enum, too long ...)
  if (err.name === 'ValidationError' && err.errors) {
    const errors = Object.values(err.errors).map((e) => e.message);
    return fail(400, errors[0] || 'Validation failed', { errors });
  }
  // Mongoose: a value couldn't be converted (e.g. "abc" as an id)
  if (err.name === 'CastError') return fail(400, `Invalid value for ${err.path}`);
  // MongoDB: unique index violated (e.g. a second admin with the same email)
  if (err.code === 11000) return fail(409, 'That record already exists');

  // Anything else is OUR bug: log it with enough context to find it, then answer 500 ----
  // Only method + path are logged (no query string, no body) so passwords and
  // customer messages never end up in the logs.
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl.split('?')[0]} -> 500`);
  console.error(err);
  return fail(500, 'Internal server error');
};

module.exports = errorHandler;