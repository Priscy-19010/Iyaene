const resend = require("./client");
const { contactMessageEmail, quoteRequestEmail } = require("./templates");

async function send({ subject, html }, replyTo) {
  try {
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.CLIENT_NOTIFY_EMAIL,
      replyTo,
      subject,
      html,
    });
    if (error) console.error("Email failed:", error);
  } catch (err) {
    console.error("Email error:", err);
  }
}

exports.notifyNewMessage = (data) =>
  send(contactMessageEmail(data), data.email);

exports.notifyNewQuote = (data) =>
  send(quoteRequestEmail(data), data.email);