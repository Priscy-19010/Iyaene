const Quote = require('../models/Quote');

exports.create = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    return res.status(201).json({ success: true, quote });
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
        { company: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    const quoteRequests = await Quote.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, quoteRequests });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const quoteRequest = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!quoteRequest) {
      return res.status(404).json({ message: 'Quote request not found' });
    }
    return res.status(200).json({ success: true, quoteRequest });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};