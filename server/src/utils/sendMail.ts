import nodemailer from "nodemailer";

interface IEmail {
  toEmail: string;
  emailSubject: string;
  emailHTML: string;
}

export async function sendMail({
  toEmail,
  emailSubject,
  emailHTML,
}: IEmail) {
  let transporter = nodemailer.createTransport({
    //@ts-ignore
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.SEND_EMAIL_USER,
      pass: process.env.SEND_EMAIL_PASSWORD,
    },
  });

  const email = {
    from: '"Budget App" <budget.app@outlook.com>',
    to: toEmail,
    subject: emailSubject,
    html: emailHTML,
  };

  await transporter.sendMail(email);
}