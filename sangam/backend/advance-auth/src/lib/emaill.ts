import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PASS ||
    !process.env.SMTP_USER
  ) {
    console.log("No credentials rec in the send email");
    return;
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || "587");
  const from = process.env.EMAIL_FROM;

  const transpoter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user,
      pass,
    },
  });

  await transpoter.sendMail({
    from,
    to,
    subject,
    html,
  });
}
