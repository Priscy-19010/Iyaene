const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.trim() })
      .collation({ locale: 'en', strength: 2 })
      .select('+password');

    const isPasswordValid = await bcrypt.compare(password, admin ? admin.password : DUMMY_HASH);

    if (!admin || !isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: admin.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

exports.me = (req, res) => {
  return res.status(200).json({ success: true, admin: req.admin });
};