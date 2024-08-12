const express = require('express');
const crypto = require('crypto');
const User = require('../models/User'); // Adjust the path as necessary
const sgMail = require('@sendgrid/mail');
const router = express.Router();

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Password Reset Request
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Send email with reset link
    const msg = {
      to: 'pawanwagh479@gmail.com',
      from: 'sujalshah630@gmail.com', // Your verified SendGrid sender email
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) has requested to reset the password for your account.\n\n
        Please click on the following link, or paste it into your browser, to complete the process:\n\n
        http://${req.headers.host}/reset/${resetToken}\n\n
        If you did not request this, please ignore this email.\n`,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ message: 'Error requesting password reset' });
  }
});

// Password Reset Confirmation
router.post('/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    // Update the user's password
    user.password = password; // Assuming you are not hashing the password for simplicity here
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

module.exports = router;
