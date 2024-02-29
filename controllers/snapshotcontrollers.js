const axios = require("axios");
const trigger_axios = require("axios");
const { response } = require("express");
const { check, validationResult } = require('express-validator');
const dotenv = require("dotenv").config({ path: "./config.env" });
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const config = {
  headers: {
    "x-api-userid": process.env.APIUSERID,
    "x-api-key": process.env.APISIGNATURE
  },
};

// async function getTriggerByName(name) {
//   let sql = `SELECT default_trigger_id FROM default_trigger 
//                     WHERE default_trigger_name = ?`;
//   const [rows, fields] = await conn.query(sql, [name]);
//   return rows[0];
// }

// async function getDefaultTriggers() {
//   const default_triggers_endpoint = `http://localhost:3002/defaultTriggers`;

//   await trigger_axios
//     .get(default_triggers_endpoint)
//     .then((response) => {
//       const triggers = response.data;
//       return triggers;
//     })
//     .catch((error) => {
//       throw error;
//     });
// }

exports.getLandingPage = (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  console.log(`User data from session: ${isloggedin}, ${userid}`);
  res.render("index", {
    user: userdetails,
    loggedin: isloggedin,
  });
};

exports.getUserSnapshots = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  console.log(`User data from session: ${isloggedin}, ${userid}`);

  await axios
    .all([
      axios.get(`http://localhost:3002/defaultTriggers`, config),
      axios.get(`http://localhost:3002/user/${userid}/snapshots`, config),
    ])
    .then(
      axios.spread((defaultTriggers, snapshots) => {
        // Both requests are now complete

        defaultTriggers = defaultTriggers.data;
        res.render("viewsnapshots", {
          user: userdetails,
          loggedin: isloggedin,
          defaultTriggers: defaultTriggers.result,
          snapshots: snapshots.data.result,
        });
      })
    )
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.getAddNewSnapshot = async (req, res) => {
  const { isloggedin } = req.session;
  console.log(`User logged in: ${isloggedin}`);

  const endpoint = `http://localhost:3002/defaultTriggers`;

  await axios
    .get(endpoint, config)
    .then((response) => {
      const data = response.data.result;
      console.log(data);
      res.render("addsnapshot", {
        loggedin: isloggedin,
        defaultTriggers: data,
      });
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.selectSnapshot = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  console.log(`User data from session: ${isloggedin}, ${userid}`);
  const id = req.params.id;

  await axios
    .all([
      axios.get(`http://localhost:3002/defaultTriggers`, config),
      axios.get(`http://localhost:3002/user/${userid}/edit/${id}`, config),
    ])
    .then(
      axios.spread((defaultTriggers, snapshot) => {
        // Both requests are now complete

        defaultTriggers = defaultTriggers.data;
        res.render("editsnapshot", {
          user: userdetails,
          loggedin: isloggedin,
          defaultTriggers: defaultTriggers.result,
          snapshot: snapshot.data.result,
        });
      })
    )
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.postNewSnapshot = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  console.log(`User data from session: ${isloggedin}, ${userid}`);
  const new_details = req.body;

  const endpoint = `http://localhost:3002/user/${userid}/new`;
  await axios
    .post(endpoint, new_details, config)
    .then((response) => {
      console.log(response.data);
      res.redirect(`/user/${userid}/edit/${response.data.snapshot_id}`);
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.updateSnapshot = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  console.log(`User data from session: ${isloggedin}, ${userid}`);
  const id = req.params.id;
  const new_details = req.body;
  console.log(req.body.snapshot_trigger_ids);
  const vals = [new_details, id];

  const endpoint = `http://localhost:3002/user/${userid}/edit/${id}`;
  await axios
    .put(endpoint, vals, config)
    .then((response) => {
      console.log(response.data);
      res.redirect(`/user/${userid}/edit/${id}`);
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.deleteSnapshot = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  console.log(`User data from session: ${isloggedin}, ${userid}`);
  const id = req.params.id;

  const endpoint = `http://localhost:3002/user/${userid}/del/${id}`;
  await axios
    .delete(endpoint, config)
    .then((response) => {
      console.log(response.data);
      res.redirect(`../snapshots`);
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.getLogin = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  res.render("login", {
    loggedin: isloggedin,
    error: null
  });
};

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.array()) {
    return res.status(422).render("login", { error: errors.array()[0].msg });
  }
  const vals = ({ username: username, userpass: userpass } = req.body);
  console.log(vals);
  const endpoint = `http://localhost:3002/login`;

  await axios
    .post(
      endpoint,
      vals,
      {
        validateStatus: (status) => {
          return status < 500;
        },
        headers: config["headers"],
      }
    )
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
    error: null,
  });
};

exports.postRegister = async (req, res) => {
  //add check no current user with that email
  const new_details = req.body;
  const plain_password = new_details.userpass;
  console.log(plain_password);

  const endpoint = `http://localhost:3002/register`;

  await axios
    .post(
      endpoint,
      new_details,
      {
        validateStatus: (status) => {
          return status < 500;
        },
        headers: config["headers"],
      },
      
    )
    .then((response) => {
      if (response.status > 400) {
        res.render('register', {
            loggedin: false,
            error: response.data.message
        }
        )
      } 
      //const data = response.data.result;
      console.log(response.data);
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.getContact = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  res.render(
    "contact",
    {
      loggedin: isloggedin,
      errors: "",
    }
  );
};

exports.postContact =
  ("/send",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid Email Address"),
    check("message").notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    const userdetails = ({ isloggedin, userid, username } = req.session);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render(
        "contact",
        {
          loggedin: isloggedin,
          errors: errors.mapped(),
        }
      );
    } else {
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

      transporter.sendMail(mail_option, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          res.render("success",
            {
              loggedin: isloggedin
            }
          );
        }
      });
    }
  });

 