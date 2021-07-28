require('dotenv').config();
const contactRouter = require('express').Router();
// const path = require('path');
const nodemailer = require('nodemailer');
// const nodemailerHbs = require('nodemailer-express-handlebars');

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_PASSWORD } = process.env;

// configuration of the mailbox that will send the mails
const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL_ADDRESS,
    pass: SENDER_EMAIL_PASSWORD,
  },
});

contactRouter.post('/', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptionsHtml = {
    from: SENDER_EMAIL_ADDRESS,
    to: SENDER_EMAIL_ADDRESS,
    cc: email,
    subject: `Message envoyé par ${name}`,
    html: `${message}`,
  };

  transport.sendMail(mailOptionsHtml, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Message envoyé avec succès !!');
    }
  });
});

module.exports = contactRouter;
