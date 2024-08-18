const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error sending email:', error.message);
  }
};

module.exports = sendEmail;
