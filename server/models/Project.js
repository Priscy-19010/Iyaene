const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  discipline: { type: String, required: true },
  year: { type: Number },
  location: { type: String },
  displayOrder: { type: Number, default: 0 },
  summary: { type: String },
  tags: [{ type: String }],
  imageUrl: { type: String },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);