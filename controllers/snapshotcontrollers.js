const axios = require("axios");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const config = {
  headers: {
    "x-api-userid": process.env.APIUSERID,
    "x-api-key": process.env.APISIGNATURE,
  },
};

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

exports.getAddNewSnapshot = async (req, res, next, errors = []) => {
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
        errors: errors,
      });
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.selectSnapshot = async (req, res, next, errors = []) => {
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
          errors: errors,
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
  const errors = validationResult(req);
  console.log(errors.array());
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  if (extractedErrors.length != 0) {
    return this.getAddNewSnapshot(req, res, null,  extractedErrors);
  }

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
  const errors = validationResult(req);
  console.log(errors.array());
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  if (extractedErrors.length != 0) {
    return this.selectSnapshot(req, res, null, extractedErrors);
  }

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


