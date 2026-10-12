// middleware/validateProject.js
const { str } = require('../utils/sanitize');

const toInt = (v) => {
  if (Number.isInteger(v)) return v;
  if (typeof v === 'string' && /^-?\d+$/.test(v.trim())) return parseInt(v, 10);
  return NaN;
};

const toBool = (v) => {
  if (typeof v === 'boolean') return v;
  if (v === 'true') return true;
  if (v === 'false') return false;
  return null;
};

const build = (body, partial) => {
  const out = {};
  const errors = [];
  const sent = (key) => body[key] !== undefined;

  for (const [key, max] of [['title', 150], ['discipline', 100]]) {
    if (sent(key) || !partial) {
      const v = str(body[key]);
      if (!v || v.length > max) errors.push(`${key} is required (max ${max} characters)`);
      else out[key] = v;
    }
  }

  for (const [key, max] of [['location', 150], ['summary', 2000]]) {
    if (sent(key)) {
      const v = str(body[key]);
      if (typeof body[key] !== 'string' || v.length > max) errors.push(`${key} must be text (max ${max} characters)`);
      else out[key] = v;
    }
  }

  if (sent('year')) {
    const y = toInt(body.year);
    if (Number.isNaN(y) || y < 1900 || y > 2100) errors.push('year must be a number between 1900 and 2100');
    else out.year = y;
  }

  if (sent('displayOrder')) {
    const n = toInt(body.displayOrder);
    if (Number.isNaN(n) || n < 0 || n > 100000) errors.push('displayOrder must be a whole number');
    else out.displayOrder = n;
  }

  if (sent('published')) {
    const b = toBool(body.published);
    if (b === null) errors.push('published must be true or false');
    else out.published = b;
  }

  if (sent('imageUrl')) {
    const v = str(body.imageUrl);
    if (v.length > 500 || !/^(https?:\/\/|\/uploads\/)/.test(v)) errors.push('imageUrl is not valid');
    else out.imageUrl = v;
  }

  if (sent('tags')) {
    const ok =
      Array.isArray(body.tags) &&
      body.tags.length <= 20 &&
      body.tags.every((t) => typeof t === 'string' && t.trim() && t.trim().length <= 40);
    if (!ok) errors.push('tags must be a list of up to 20 short text values');
    else out.tags = body.tags.map((t) => t.trim());
  }

  if (partial && errors.length === 0 && Object.keys(out).length === 0) {
    errors.push('Nothing to update');
  }
  return { out, errors };
};

const makeValidator = (partial) => (req, res, next) => {
  const { out, errors } = build(req.body ?? {}, partial);
  if (errors.length) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }
  req.body = out;
  next();
};

exports.validateProject = makeValidator(false);
exports.validateProjectUpdate = makeValidator(true);