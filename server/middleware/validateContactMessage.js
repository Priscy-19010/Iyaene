// middleware/validateContactMessage.js
const { str, isEmail } = require('../utils/sanitize');

exports.validateContactMessage = (req, res, next) => {
  const name = str(req.body?.name);
  const email = str(req.body?.email).toLowerCase();
  const message = str(req.body?.message);

  const errors = [];
  if (name.length < 2 || name.length > 100) errors.push('Name must be 2 to 100 characters');
  if (!isEmail(email)) errors.push('A valid email address is required');
  if (message.length < 5 || message.length > 5000) errors.push('Message must be 5 to 5000 characters');

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  req.body = { name, email, message };
  next();
};