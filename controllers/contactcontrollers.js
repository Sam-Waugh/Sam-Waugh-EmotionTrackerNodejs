const axios = require("axios");
const nodemailer = require("nodemailer");

exports.getContact = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  res.render("contact", {
    loggedin: isloggedin,
    errors: "",
  });
};

exports.postContact = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAILUSERNAME,
      pass: process.env.GMAILPASSWORD,
    },
  });

  const mail_option = {
    from: req.body.email,
    to: "sam.waugh90@gmail.com",
    text: req.body.message,
  };

  transporter.sendMail(mail_option, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.render("success", {
        loggedin: isloggedin,
      });
    }
  });
};
