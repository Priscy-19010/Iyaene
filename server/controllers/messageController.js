const Message = require('../models/Message');
const env = require('../config/env');
const { sendEmailSafely } = require('../utils/sendEmail');
const { contactMessageEmail } = require('../utils/emailTemplates');
const { escapeRegex } = require('../utils/sanitize');
const STATUSES = ['new', 'in_progress', 'responded', 'closed'];

// No try/catch needed: if anything below throws, Express 5 passes the error to middleware/errorHandler.js

exports.create = async (req, res) => {
  const message = await Message.create(req.body);

  // Only after the database save succeeded. sendEmailSafely never throws,
  // so an email problem can't make the visitor's form look like it failed.
  await sendEmailSafely('contact message', {
    to: env.email.notifyTo,
    ...contactMessageEmail(message),
  });

  return res.status(201).json({ success: true, message });
};

exports.getAll = async (req, res) => {
  const { status, search } = req.query;
  const filter = {};

  if (typeof status === 'string' && STATUSES.includes(status)) filter.status = status;
  if (typeof search === 'string' && search.trim()) {
    const pattern = escapeRegex(search.trim().slice(0, 100));
    filter.$or = [
      { name: { $regex: pattern, $options: 'i' } },
      { email: { $regex: pattern, $options: 'i' } },
    ];
  }

  const messages = await Message.find(filter).sort({ createdAt: -1 });
  return res.status(200).json({ success: true, messages });
};

exports.updateStatus = async (req, res) => {
  // Express 5 leaves req.body undefined when no body was sent
  const { status } = req.body ?? {};

  if (typeof status !== 'string' || !STATUSES.includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: `Status must be one of: ${STATUSES.join(', ')}` });
  }

  const contactMessage = await Message.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contactMessage) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }

  return res.status(200).json({ success: true, contactMessage });
};