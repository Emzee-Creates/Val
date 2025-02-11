const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Body parser to handle POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Nodemailer transporter (using Gmail for this example)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,  // Use TLS
  auth: {
    user: process.env.EMAIL_USER ,  // Replace with your email
    pass: process.env.EMAIL_PASS,   // Replace with your email password (Use App Password if 2FA is enabled)
  },
});

// Route to send email
app.post('/send-email', (req, res) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'emmanuelemoruwa356@gmail.com', // Replace with recipient's email
    subject: 'Happy Valentine\'s Day!',
    text: 'Sending you lots of love on this special day Eriife! 💖',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);  // Log only if there's an error
      return res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);  // Log success only if email is sent successfully
      return res.status(200).send('Email sent successfully!');
    }
    console.log("Check your mail😉")
    return res.status(200).send('Email Attempt Made!')
  });
});
// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on: ${PORT}`);
});
