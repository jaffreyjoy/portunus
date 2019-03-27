const mail = require('./mail');

function getEmailData(user) {
  let link = "http://localhost:8080/#/login";
  let data = {}
  data.subject = "Notification of successful account activation";
  data.html = `
          <h4>Dear ${user.name}, </h4>
          <p>Your account has been succesfully activated.</p>
          <p>Click on this <a href="${link}">link</a> to login to your activated account.</p>
          <br>
          <h4>Regards,</h4>
          <h4>The Portunus Team</h4>
        `;
  return ([user.email, data]);
}

let dataObj = {
  user: {
    name: "Jaffrey Joy",
    email: "jaffreyjoy@gmail.com"
  }
}

mail.sendEmail(...getEmailData(dataObj.user))
  .then(res => console.log(res))
  .catch(err => console.log(err));