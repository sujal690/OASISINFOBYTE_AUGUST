const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' for Gmail accounts
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send verification email
const sendVerificationEmail = async (to, token) => {
  const url = `http://localhost:5000/api/auth/verify-email?token=${token}`;
  await transporter.sendMail({
    to,
    subject: 'Email Verification',
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
  });
};

// Send low stock notification email
const sendLowStockNotification = async (item) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'Low Stock Alert',
    text: `The stock for ${item.name} is below the threshold. Current stock: ${item.stock}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendVerificationEmail, sendLowStockNotification };
