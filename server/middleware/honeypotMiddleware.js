exports.checkHoneypot = (req, res, next) => {
  if (req.body?.website) {
    return res.status(200).json({ success: true });
  }
  next();
};