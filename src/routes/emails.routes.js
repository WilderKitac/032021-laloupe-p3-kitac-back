require('dotenv').config();
const emailsRouter = require('express').Router();
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

emailsRouter.post('/', (req, res) => {
  const { user, cart } = req.body;
  let message = '';
  for (let i = 0; i < cart.length; i++) {
    message += `<h1>Produit numéro ${i + 1} : ${cart[i].prodName}</h1> <p>Taille : ${cart[i].size}</p><p>Matière : ${
      cart[i].material
    }</p> <p>Fournitures : ${cart[i].supplies}</p> <p>Quantité : ${cart[i].quantity}</p> <p>Prix : ${cart[i].prodPrice.toFixed(2)}€</p>`;
  }

  const mailOptionsHtml = {
    from: SENDER_EMAIL_ADDRESS,
    to: SENDER_EMAIL_ADDRESS,
    // cc: email,
    subject: `Panier envoyé depuis le site Kitac par ${user}`,
    html: `${message}`,
  };

  transport.sendMail(mailOptionsHtml, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Email envoyé avec succès !!');
    }
  });
});

module.exports = emailsRouter;
