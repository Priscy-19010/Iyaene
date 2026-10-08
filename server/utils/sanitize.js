const str = (value) => (typeof value === 'string' ? value.trim() : '');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmail = (value) => value.length <= 254 && EMAIL_RE.test(value);

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = { str, isEmail, escapeRegex };