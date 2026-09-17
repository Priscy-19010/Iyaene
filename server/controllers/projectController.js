const Project = require('../models/Project');

exports.getPublished = async (req, res) => {
  try {
    const projects = await Project.find({ published: true }).sort({ displayOrder: 1 });
    return res.status(200).json({ success: true, projects });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1 });
    return res.status(200).json({ success: true, projects });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ success: true, project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    return res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};