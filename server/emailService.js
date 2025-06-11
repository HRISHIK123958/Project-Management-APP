const nodemailer = require('nodemailer');

// Setup email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // your Gmail address
    pass: process.env.EMAIL_PASS,   // your Gmail App Password
  },
});

// Function to send email invitations
const sendInvitationEmail = async (email, projectTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Invitation to Join Project: ${projectTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h3>Hello!</h3>
        <p>You have been invited to join the project <strong>${projectTitle}</strong>.</p>
        <p>Log in to your dashboard to view more details and collaborate with your team.</p>
        <br>
        <p>Best regards,</p>
        <p>Your Project Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${email}:`, error);
  }
};

module.exports = { sendInvitationEmail };
