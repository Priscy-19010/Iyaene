exports.checkHoneypot = (req, res, next) => {
  if (req.body.website) {
    // Bot detected — silently pretend success so it doesn't learn to adapt
    return res.status(200).json({ success: true });
  }
  next();
};