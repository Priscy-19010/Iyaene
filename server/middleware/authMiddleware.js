const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Small helper so every 401 response has the same shape
const unauthorized = (res, message = 'Not authorized') =>
  res.status(401).json({ success: false, message });
// Verifies the Bearer token and attaches the admin to req.admin
exports.protect = async (req, res, next) => {
  try {
    // Fail closed: if the secret is missing, refuse everything
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set - refusing all protected requests');
      return res.status(500).json({ success: false, message: 'Server misconfigured' });
    }

    // The header looks like: "Authorization: Bearer eyJhbGci..."
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    if (scheme !== 'Bearer' || !token) {
      return unauthorized(res, 'Not authorized, no token');
    }

    // Check the signature and expiry. jwt.verify throws if either is bad.
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    } catch (err) {
      return unauthorized(
        res,
        err.name === 'TokenExpiredError'
          ? 'Token expired, please log in again'
          : 'Invalid token'
      );
    }

    // Look the admin up on every request so a deleted account loses access immediately
    const admin = await Admin.findById(decoded.id).select('-password');  //don't add password to the payload
    if (!admin) {
      return unauthorized(res, 'Account no longer exists');
    }

    // Make the admin available to everything that runs after this
    req.admin = admin;
    next();
  } catch (error) {
    next(error); // unexpected errors go to errorHandler
  }
};

// adminOnly: "Are you allowed?"
// Must run AFTER protect, because it reads req.admin
exports.adminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === 'admin') return next();
  return res.status(403).json({ success: false, message: 'Admin access required' });  // Forbidden
};