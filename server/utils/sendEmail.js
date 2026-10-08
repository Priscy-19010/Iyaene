const { Resend } = require('resend');
const env = require('../config/env');

const SEND_TIMEOUT_MS = 8000; // never keep a visitor waiting longer than this for an email

let client;
const getClient = () => {
  if (!client) client = new Resend(env.email.apiKey);
  return client;
};

// Low-level send. Throws if the email could not be sent.
// Usage: await sendEmail({ to, subject, html, text, replyTo })
const sendEmail = async ({ to, subject, html, text, replyTo }) => {
  if (!env.email.enabled) throw new Error('Email is not configured (RESEND_API_KEY missing)');

  const { data, error } = await getClient().emails.send({
    from: env.email.from,
    to,
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
  });
  if (error) throw new Error(`Resend rejected the email: ${error.message}`);
  return data;
};

// Safe wrapper used by the controllers. It NEVER throws, so a failed email can never
// turn a successfully saved form into an error for the visitor.
// It logs only the reason, not the visitor's message.
const sendEmailSafely = async (label, options) => {
  if (!env.email.enabled) return false; // email switched off: skip silently

  let timer;
  try {
    await Promise.race([
      sendEmail(options),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('timed out')), SEND_TIMEOUT_MS);
      }),
    ]);
    return true;
  } catch (err) {
    console.error(`[email] "${label}" was not sent: ${err.message}`);
    return false;
  } finally {
    clearTimeout(timer);
  }
};

module.exports = { sendEmail, sendEmailSafely };