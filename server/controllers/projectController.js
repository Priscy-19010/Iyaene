const Project = require('../models/Project');
const storage = require('../utils/storage');

// No try/catch needed: if anything below throws, Express 5 passes the error to middleware/errorHandler.js

// Deletes a project's old image file. This is the ONE place we do catch errors: the project change
// already succeeded, so a failed file delete should be logged, not turned into an error for the admin.
const removeImageIfUnused = async (imageUrl, projectId) => {
  if (!imageUrl) return;
  try {
    // Another project may use the same image: keep it if so
    const stillUsed = await Project.exists({ imageUrl, _id: { $ne: projectId } });
    if (!stillUsed) await storage.deleteImage(imageUrl);
  } catch (err) {
    console.error('Could not delete image:', err);
  }
};

exports.getPublished = async (req, res) => {
  const projects = await Project.find({ published: true }).sort({ displayOrder: 1 });
  return res.status(200).json({ success: true, projects });
};

exports.getAll = async (req, res) => {
  const projects = await Project.find().sort({ displayOrder: 1 });
  return res.status(200).json({ success: true, projects });
};

exports.getOne = async (req, res) => {
  // Public route: only published projects. Drafts look exactly like "doesn't exist" (404)
  const project = await Project.findOne({ _id: req.params.id, published: true });
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  return res.status(200).json({ success: true, project });
};

exports.create = async (req, res) => {
  const project = await Project.create(req.body);
  return res.status(201).json({ success: true, project });
};

exports.update = async (req, res) => {
  const existing = await Project.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'Project not found' });
  }
  const oldImageUrl = existing.imageUrl;

  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // The image was replaced: the old file is now unused
  if (req.body.imageUrl !== undefined && oldImageUrl !== project.imageUrl) {
    await removeImageIfUnused(oldImageUrl, project._id);
  }

  return res.status(200).json({ success: true, project });
};

exports.remove = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  await removeImageIfUnused(project.imageUrl, project._id);
  return res.status(200).json({ success: true, message: 'Project deleted' });
};

exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // The URL is built from your own config (PUBLIC_URL), never from the request's Host header
  const imageUrl = await storage.saveImage(req.file);
  return res.status(200).json({ success: true, imageUrl });
};