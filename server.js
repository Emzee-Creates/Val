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
  // Get the file path for the attachment
  const filePath = path.join(__dirname, 'attachments', 'Open Me!.zip');
  
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'emmanuelemoruwa356@gmail.com', // Replace with recipient's email
    subject: 'Happy Valentine\'s Day!',
    text: `I would have loved to buy you thousands of flowers and a million boxes of chocolates and take you to the fanciest of restaurants for dinner on this special day, unfortunately, I can't. What I CAN do is remind you of how special you are to me.

The attachment below has 3 files in it, divided into: I, Love and You.
I - It's a personal message I wrote for you
Love - They say music is the language of love and I tried to show that by making a playlist with the songs that feel most special to me.
You - A short video I put together hopefully showing how I see You as a person. (P.S I'm not a very good video editor 😭😭).

Happy Valentine's day my love. I love you more than words can describe. Keep being special to me.
Sending you lots of Love on this special day Eriife! 💖
Korede.`,
    attachments: [
      {
        filename: 'Open Me!.zip',
        path: filePath,
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);  // Log the error if any
      return res.status(500).send('Error sending email');
    } else {
      console.log('Email sent successfully:', info.response);  // Log the success if email sent
      return res.status(200).send('Email sent successfully!');
    }
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on: ${PORT}`);
});
