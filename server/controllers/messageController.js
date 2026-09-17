const Message = require('../models/Message');

exports.create = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    return res.status(201).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    const messages = await Message.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    return res.status(200).json({ success: true, contactMessage });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};