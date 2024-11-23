const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html, next) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_HOST_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    next(error);
    // throw error; // Re-throw the error to handle it in the calling function
  }
};

module.exports = { sendEmail };
