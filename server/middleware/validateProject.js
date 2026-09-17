exports.validateProject = (req, res, next) => {
  const { title, discipline } = req.body;
  if (!title || !discipline) {
    return res.status(400).json({ message: 'Title and discipline are required' });
  }
  next();
};