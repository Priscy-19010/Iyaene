const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  company: { 
    type: String 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String 
  },
  location: {
    type: String,
    required: true
  },
  message: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'responded', 'closed'],
    default: 'new'
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Quote', quoteSchema);