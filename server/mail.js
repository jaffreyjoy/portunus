const nodemailer = require('nodemailer');
const emailProvider = require('./fixtures/emailProvider.json');

const transporter = nodemailer.createTransport({
  service: emailProvider.service,
  auth: emailProvider.auth
});

module.exports = {
  sendEmail(receiverEmail, data) {
    let mailOptions = {
      from: emailProvider.auth.user,
      to: receiverEmail,
      subject: data.subject,
      html: data.html,
    };
    return new Promise(function (resolve, reject) {
      transporter.sendMail(mailOptions)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}