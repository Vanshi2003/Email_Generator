const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-email', async (req, res) => {
  const { recipients, subject, content } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients,
      subject: subject,
      text: content
    });

    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ success: false, message: 'Email sending failed.' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend working!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
