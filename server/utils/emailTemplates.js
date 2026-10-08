// Everything a visitor types ends up inside these emails, so it must be escaped:
// otherwise someone could put <script> or a fake link into your contact form.
const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// A subject line must be a single line (new lines in it can be used to inject extra email headers)
const oneLine = (value, max = 60) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

const row = (label, value) =>
  value
    ? `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${label}</td>` +
      `<td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
    : '';

const layout = (title, rows, message) => `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#222">
  <h2 style="margin:0 0 16px">${escapeHtml(title)}</h2>
  <table style="border-collapse:collapse;font-size:15px">${rows}</table>
  <h3 style="margin:20px 0 8px;font-size:15px">Message</h3>
  <div style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:6px;font-size:15px">${escapeHtml(message)}</div>
  <p style="color:#888;font-size:12px;margin-top:20px">Press Reply to answer the sender directly.</p>
</div>`;

const plain = (lines, message) => `${lines.filter(Boolean).join('\n')}\n\nMessage:\n${message}\n`;

exports.contactMessageEmail = (m) => ({
  subject: `New message from ${oneLine(m.name)}`,
  replyTo: m.email,
  html: layout('New contact message', row('Name', m.name) + row('Email', m.email), m.message),
  text: plain([`Name: ${m.name}`, `Email: ${m.email}`], m.message),
});

exports.quoteRequestEmail = (q) => ({
  subject: `New quote request from ${oneLine(q.name)}${q.company ? ` (${oneLine(q.company, 40)})` : ''}`,
  replyTo: q.email,
  html: layout(
    'New quote request',
    row('Name', q.name) + row('Company', q.company) + row('Email', q.email) + row('Phone', q.phone),
    q.message
  ),
  text: plain(
    [`Name: ${q.name}`, q.company && `Company: ${q.company}`, `Email: ${q.email}`, q.phone && `Phone: ${q.phone}`],
    q.message
  ),
});