const axios = require("axios");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const config = {
  headers: {
    "x-api-userid": process.env.APIUSERID,
    "x-api-key": process.env.APISIGNATURE,
  },
};


exports.getLogin = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  res.render("login", {
    loggedin: isloggedin,
    errors: [],
  });
};

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array());
  const vals = ({ username: username, userpass: userpass } = req.body);
  console.log(vals);
  const endpoint = `http://localhost:3002/login`;

  await axios
    .post(endpoint, vals, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: config["headers"],
    })
    .then((response) => {
      const status = response.status;
      if (status === 200) {
        const data = response.data;
        console.log(data);
        const session = req.session;
        session.isloggedin = true;
        session.userid = data.id;
        session.username = data.username;
        console.log(session);

        const orig_route = session.route;
        console.log(`postLogin: orig_route: ${orig_route}`);
        if (orig_route) {
          res.redirect(`${orig_route}`);
        } else {
          res.redirect(`/user/${session.userid}/snapshots`);
        }
      } else {
        const data = response.data;
        console.log(data);
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.getLogout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getRegister = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  res.render("register", {
    loggedin: isloggedin,
    errors: [],
  });
};

exports.postRegister = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array());
  const new_details = req.body;
  const plain_password = new_details.userpass;
  console.log(plain_password);

  const endpoint = `http://localhost:3002/register`;

  await axios
    .post(endpoint, new_details, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: config["headers"],
    })
    .then((response) => {
      if (response.status > 400) {
        res.render("register", {
          loggedin: false,
          error: response.data.message,
        });
      }
      console.log(response.data);
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

