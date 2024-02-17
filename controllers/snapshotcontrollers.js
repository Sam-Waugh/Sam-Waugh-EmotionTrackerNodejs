const axios = require("axios");
const trigger_axios = require("axios");
const { response } = require("express");

async function getTriggerByName(name) {
  let sql = `SELECT default_trigger_id FROM default_trigger 
                    WHERE default_trigger_name = ?`;
  const [rows, fields] = await conn.query(sql, [name]);
  return rows[0];
}

async function getDefaultTriggers() {
  const default_triggers_endpoint = `http://localhost:3002/defaultTriggers`;

  await trigger_axios
    .get(default_triggers_endpoint)
    .then((response) => {
      const triggers = response.data;
      return triggers;
    })
    .catch((error) => {
      throw error;
    });
}

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

  if (isloggedin) {
    await axios
      .all([
        axios.get(`http://localhost:3002/defaultTriggers`),
        axios.get(`http://localhost:3002/user/${userid}/snapshots`),
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
      );
  } else {
    res.redirect("/login");
  }
};

/*.then((response) => {
          const userdetails = response.data.result;
          console.log(userdetails);
          const username = userdetails[0].name;
          const userrole = userdetails[0].role;

          const session = req.session;
          session.name = username;
          session.role = userrole;
          console.log(session);

          userinfo = { name: username, role: userrole };
          console.log(userinfo);
        })
        .catch((error) => {
          console.log(`Error making API request: ${error}`);
        });

    } else {
        res.redirect('/login');
    }

    const endpoint = `http://localhost:3002/snapshots`;
        await axios
          .get(endpoint)
          .then((response) => {
              const snapshotdetails = response.data.result;
              console.log(snapshotdetails);
              
              res.render("index", {
                  user: userinfo,
                  loggedin: isloggedin,
                  snapshot: snapshotdetails,
                  defaulttriggers: defaulttriggerdetails,
              });
            })
          .catch((error) => {
            console.log(`Error making API request: ${error}`);
          });    
};*/

exports.getAddNewSnapshot = async (req, res) => {
  const { isloggedin } = req.session;
  console.log(`User logged in: ${isloggedin}`);

  if (isloggedin) {
    const endpoint = `http://localhost:3002/defaultTriggers`;
    //const endpoint = "https://google.com";

    await axios
      .get(endpoint)
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
  } else {
    res.redirect("/login");
  }
};

exports.selectSnapshot = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  console.log(`User data from session: ${isloggedin}, ${userid}`);
  const id = req.params.id;

  if (isloggedin) {
    await axios
      .all([
        axios.get(`http://localhost:3002/defaultTriggers`),
        axios.get(`http://localhost:3002/user/${userid}/edit/${id}`),
        // axios.get("https://google.com"),
        // axios.get("https://google.com"),
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
      );
    /*
    const snapshot_id = req.params.id;
    const endpoint = `http://localhost:3002/user/${userid}/snapshots/${snapshot_id}`;

        await axios.get(endpoint)
          .then((response) => {
            const data = response.data.result;
            console.log(data);
            res.render("editschedule", {
              loggedin: isloggedin,
              snapshotdetails: data
            });
          })
          .catch((error) => {
            console.log(`Error making API request: ${error}`);
          });*/
  } else {
    res.redirect("/");
  }
};
/*
    const snapshotSQL = `SELECT * FROM emotional_snapshot WHERE emotional_snapshot.emotional_snapshot_id = ${id}`;
    const defaulttriggerSQL = `SELECT default_trigger.default_trigger_name FROM snapshot_default_trigger 
                        INNER JOIN default_trigger ON
                        snapshot_default_trigger.default_trigger_id = default_trigger.default_trigger_id
                        WHERE emotional_snapshot_id = ${id}`;

    try {
      const [snapshotdetails, fielddata1] = await conn.query(snapshotSQL, vals);
      const [defaulttriggerdetails, fielddata2] = await conn.query(
        defaulttriggerSQL,
        vals
      );

      ($f3) =>
        set("defaulttriggerdetails", json_encode($defaulttriggerdetails));

      res.render("editsnapshot", {
        loggedin: isloggedin,
        snapshot: snapshotdetails,
        defaulttriggers: defaulttriggerdetails,
      });
    } catch (err) {
      console.log(err);
    }
*/

exports.postNewSnapshot = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  console.log(`User data from session: ${isloggedin}, ${userid}`);
  const new_details = req.body;

  if (isloggedin) {
    /*await axios
      .all([
        axios.get(`http://localhost:3002/defaultTriggers`),
        axios.get(`http://localhost:3002/user/${userid}/new`),
      ])
      .then(
        axios.spread((defaultTriggers, new_details) => {
          // Both requests are now complete

          defaultTriggers = defaultTriggers.data;
          // res.render("addsnapshot", {
          //   user: userdetails,
          //   loggedin: isloggedin,
          //   defaultTriggers: defaultTriggers.result,
          //   new_details: new_details.data.result,
          // });
          res.redirect(`/user/${user_id}/edit/${new_details.data.snapshot_id}`);
        })
      );*/
    const endpoint = `http://localhost:3002/user/${userid}/new`;
      await axios
        .post(endpoint, new_details)
        .then((response) => {
          console.log(response.data);
          res.redirect(`/user/${userid}/edit/${response.data.snapshot_id}`);
        })
        .catch((error) => {
          console.log(`Error making API request: ${error}`);
        });
  } else {
    res.redirect("/login");
  }
  /*
  const userid = req.session.userid;
  const { new_details, new_date } = req.body;
  const vals = [userid, new_details, new_date];
  const insertSQL =
    "INSERT INTO emotional_snapshot (user_id, notes, created_ts) VALUES (?, ?, ?)";

  try {
    const [newsnapshot, fields] = await conn.query(insertSQL, vals);
    console.log(newsnapshot);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }*/
};

exports.updateSnapshot = async (req, res) => {
  const userdetails = ({ isloggedin, userid, username } = req.session);
  console.log(`User data from session: ${isloggedin}, ${userid}`);
  const id = req.params.id;
  const new_details = req.body;
  console.log(req.body.snapshot_trigger_ids);
  const vals = [new_details, id];

  if (isloggedin) {
    const endpoint = `http://localhost:3002/user/${userid}/edit/${id}`;
    await axios
      .put(endpoint, vals)
      .then((response) => {
        console.log(response.data);
        res.redirect("/");
      })
      .catch((error) => {
        console.log(`Error making API request: ${error}`);
      });
  } else {
    res.redirect("/");
  }
};
/*

  const snapshot_id = req.params.id;
  const snapshot_notes = req.body.snapshot_notes;
  const default_trigger_name = req.body.snapshot_default_trigger;
  const vals1 = [snapshot_notes, snapshot_id];
  //const default_trigger_name = req.body.default_trigger_name;
  //const vals2 = [snapshot_id, snapshot_default_triggers.default_trigger_id ];

  const updatesnapshotSQL =
    "UPDATE emotional_snapshot SET notes = ? WHERE emotional_snapshot_id = ?";
  const deletedefaulttriggerSQL = `DELETE FROM snapshot_default_trigger WHERE emotional_snapshot_id = ?`;
  const defaulttriggerSQL = `SELECT default_trigger.default_trigger_name FROM snapshot_default_trigger 
                        INNER JOIN default_trigger ON
                        snapshot_default_trigger.default_trigger_id = default_trigger.default_trigger_id`;
  //const defaulttriggeridSQL = `SELECT default_trigger_id FROM default_trigger
  //                    WHERE default_trigger_name = ?`;
  const updatedefaulttriggerSQL = `INSERT INTO snapshot_default_trigger (emotional_snapshot_id, default_trigger_id) VALUES (?, ?)`;

  try {
    const [updatedsnapshot, fielddata1] = await conn.query(
      updatesnapshotSQL,
      vals1
    );
    const [deleteddefaulttrigger, fielddata2] = await conn.query(
      deletedefaulttriggerSQL,
      snapshot_id
    );
    const [defaulttriggerdetails, fielddata3] = await conn.query(
      defaulttriggerSQL
    );
    //const [defaulttriggerid] = await conn.query(defaulttriggeridSQL, default_trigger_name);

    ///const default_trigger_id = (async () => {console.log(await getTriggerByName(default_trigger_name))})()
    const default_trigger = await getTriggerByName(default_trigger_name);

    console.log(default_trigger);
    //default_trigger_id = default_trigger_info[0].default_trigger_id;
    const default_trigger_details = {
      default_trigger: default_trigger,
      default_trigger_name: default_trigger_name,
    };
    console.log(default_trigger_details);

    const [updateddefaulttrigger, fielddata4] = await conn.query(
      updatedefaulttriggerSQL,
      [snapshot_id, default_trigger.default_trigger_id]
    );

    console.log(updatedsnapshot);
    console.log(updateddefaulttrigger);
    console.log(deleteddefaulttrigger);
    console.log(defaulttriggerdetails);
    console.log(default_trigger);

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};*/

exports.deleteSnapshot = async (req, res) => {
  const snapshot_id = req.params.id;

  const endpoint = `http://localhost:3002/snapshots/${snapshot_id}`;
  await axios
    .delete(endpoint)
    .then((response) => {
      console.log(response.data);
      res.redirect("/");
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};

exports.getLogin = async (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  const vals = ({ username: username, userpass: userpass } = req.body);
  console.log(vals);
  const endpoint = `http://localhost:3002/login`;

  await axios
    .post(endpoint, vals, {
      validateStatus: (status) => {
        return status < 500;
      },
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
        res.redirect(`/user/${session.userid}/snapshots`);
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
  res.render("register");
};

exports.postRegister = async (req, res) => {
  //add check no current user with that email
  const new_details = req.body;
  const plain_password = new_details.userpass;
  console.log(plain_password);

  const endpoint = `http://localhost:3002/register`;

  await axios
    .post(endpoint, new_details, {
      validateStatus: (status) => {
        return status < 500;
      },
    })
    .then((response) => {
      //const data = response.data.result;
      console.log(response.data);
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(`Error making API request: ${error}`);
    });
};
