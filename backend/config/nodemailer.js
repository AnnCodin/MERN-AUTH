import nodemailer from "nodemailer";

// Validate SMTP configuration
const validateSMTPConfig = () => {
  const required = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "SENDER_EMAIL",
  ];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(
      `Missing SMTP configuration: ${missing.join(", ")}. Email features will not work.`,
    );
    return false;
  }
  return true;
};

const isSMTPConfigured = validateSMTPConfig();

const transporter = isSMTPConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: parseInt(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  : null;

export default transporter;
