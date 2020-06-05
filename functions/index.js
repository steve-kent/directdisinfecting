'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.submit = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      if (req.method !== 'POST') {
        return;
      }

      console.log(JSON.stringify(req));
  
      const mailOptions = {
        from: '"Contact Request" <directdisinfectingmobile@gmail.com>',
        replyTo: req.body.email,
        to: 'stevekentsphone@gmail.com',
        subject: 'Contact/Quote Request',
        text: `Email: ${req.body.email}`,
        html: `<p>Email: ${req.body.email}</p>`
      };
  
      mailTransport.sendMail(mailOptions);
  
      res.status(200).end();
      // or you can pass data to indicate success.
      // res.status(200).send({isEmailSend: true});
    });
  });

/*
admin.initializeApp();

//creating function for sending emails
var goMail = function (message) {

//transporter is a way to send your emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailEmail,
            pass: gmailPassword
        }
    });

    // setup email data with unicode symbols
    //this is how your email are going to look like
    const mailOptions = {
        from: gmailEmail, // sender address
        to: 'salesdepartment@youcompany.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: '!' + message, // plain text body
        html: '!' + message // html body
    };

    //this is callback function to return status to firebase console
    const getDeliveryStatus = function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    };

    //call of this function send an email, and return status
    transporter.sendMail(mailOptions, getDeliveryStatus);
};

//.onDataAdded is watches for changes in database
exports.onDataAdded = functions.database.ref('/emails/{sessionId}').onCreate(function (snap, context) {

    //here we catch a new data, added to firebase database, it stored in a snap variable
    const createdData = snap.val();
    var text = createdData.mail;

    //here we send new data using function for sending emails
    goMail(text);
});
////////////////////////////////////////////////

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.database.ref('/users/{uid}').onWrite(async (change) => {
  const snapshot = change.after;
  const val = snapshot.val();

  if (!snapshot.changed('subscribedToMailingList')) {
    return null;
  }

  const mailOptions = {
    from: '"Spammy Corp." <directdisinfectingmobile@gmail.com>',
    to: val.email,
  };

  const subscribed = val.subscribedToMailingList;

  // Building Email message.
  mailOptions.subject = subscribed ? 'Thanks and Welcome!' : 'Sad to see you go :`(';
  mailOptions.text = subscribed ?
      'Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.' :
      'I hereby confirm that I will stop sending you the newsletter.';
  
  try {
    await mailTransport.sendMail(mailOptions);
    console.log(`New ${subscribed ? '' : 'un'}subscription confirmation email sent to:`, val.email);
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;
});
*/