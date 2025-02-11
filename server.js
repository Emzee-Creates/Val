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
    user: 'emmanuelemoruwa356@gmail.com',  // Replace with your email
    pass: 'syra vgcm rklv ufku',   // Replace with your email password (Use App Password if 2FA is enabled)
  },
});

// Route to send email
app.post('/send-email', (req, res) => {
  const mailOptions = {
    from: 'emmanuelemoruwa356@gmail.com',
    to: 'emmanuelemoruwa356@gmail.com', // Replace with recipient's email
    subject: 'Happy Valentine\'s Day!',
    text: 'Sending you lots of love on this special day! 💖',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log('Email sent: ' + info.response);
    return res.status(200).send('Email sent successfully!');
  });
});

// Start the server
app.listen(PORT, '0, 0, 0, 0', () => {
  console.log(`Server running on: ${PORT}`);
});
