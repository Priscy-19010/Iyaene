// Escape user input so visitors can't inject HTML into the email
const esc = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const row = (label, value) =>
  value
    ? `<p><strong>${label}:</strong> ${esc(value)}</p>`
    : "";

exports.contactMessageEmail = (data) => ({
  subject: `New contact message from ${data.name}`,
  html: `
    <h2>New Contact Message</h2>
    ${row("Name", data.name)}
    ${row("Email", data.email)}
    ${row("Phone", data.phone)}
    ${row("Message", data.message)}
  `,
});

exports.quoteRequestEmail = (data) => ({
  subject: `New quote request from ${data.name}`,
  html: `
    <h2>New Quote Request</h2>
    ${row("Name", data.name)}
    ${row("Email", data.email)}
    ${row("Phone", data.phone)}
    ${row("Service", data.service)}
    ${row("Project details", data.message)}
  `,
});