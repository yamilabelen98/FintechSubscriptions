const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || "smtp.gmail.com",
  port: process.env.MAILTRAP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER || process.env.GMAIL_USER,
    pass: process.env.MAILTRAP_PASS || process.env.GMAIL_PASS,
  },
});

exports.sendSubscriptionEmail = async ({ to, nombre, plan }) => {
  await transporter.sendMail({
    from: '"Fintech App" <no-reply@fintech.com>',
    to,
    subject: "🎉 Suscripción activada",
    text: `Hola ${nombre}, tu suscripción al plan "${plan}" está activa. ¡Gracias por confiar en nosotros!`,
  });
};
