const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async (mailData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    // generate email body using Mailgen
    const MailGenerator = new mailgen({
      theme: "default",
      product: {
        name: process.env.APP_NAME,
        link: "#",
      },
    });

    // body of the email
    const email = {
      body: {
        name: mailData.name,
        intro:
          "Welcome to Vision Craft Marketplace! We’re very excited to have you on board.",
        action: {
          instructions: "Please click below button to activate your account",
          button: {
            text: "Confirm your account",
            link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
          },
        },
      },
    };

    const emailBody = MailGenerator.generate(email);

    await transporter.sendMail({
      from: process.env.MAIL_EMAIL_FROM,
      to: mailData.mail,
      subject: mailData.subject,
      html: emailBody,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;