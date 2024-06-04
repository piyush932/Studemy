const nodemailer = require("nodemailer");

const sendMail = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporrter.sendMail({
      from: "Studemy",
      to: `${email}`,
      subject: `${subject}`,
      html: `${text}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
