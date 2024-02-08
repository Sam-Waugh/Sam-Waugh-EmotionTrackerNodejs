const conn = require('../utils/dbconn');
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function compareHashPassword(password, hash) { 
    const isSame = await bcrypt.compare(password, hash) 
    console.log((password, hash));
    console.log(isSame);   
    return isSame;
}

async function bcryptPassword(password, saltRounds) {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);
    return hash;
}

async function getSavedHashPassword(userid) { 

    let getsaltedhashpassSQL = `SELECT password_saltedhash FROM user WHERE user_id = '${userid}'`;

    const [rows, fields] = await conn.query(getsaltedhashpassSQL, [userid]);
    return rows[0];
}
    
async function getTriggerByName(name) {

    let sql = `SELECT default_trigger_id FROM default_trigger 
                    WHERE default_trigger_name = ?`;
    const [rows, fields] = await conn.query(sql, [name]);
    return rows[0];
}

exports.getSnapshots = async (req, res) => {

    var userinfo = {};
    const { isloggedin, userid } = req.session;
    console.log(`User data from session: ${isloggedin}, ${userid}`);

    if (isloggedin) {

        const getuserSQL = `SELECT user.username FROM user
                        WHERE user.user_id = '${userid}'`;
        const snapshotSQL = `SELECT * FROM emotional_snapshot 
                        WHERE emotional_snapshot.user_id = ${userid}`;
        const defaulttriggerSQL = `SELECT default_trigger.default_trigger_name FROM snapshot_default_trigger 
                        INNER JOIN default_trigger ON
                        snapshot_default_trigger.default_trigger_id = default_trigger.default_trigger_id`;

        try {

            const [userdetails, fielddata1] = await conn.query(getuserSQL, userid);
            const [snapshotdetails, fielddata2] = await conn.query(snapshotSQL, userid);
            const [defaulttriggerdetails, fielddata3] = await conn.query(defaulttriggerSQL, userid);

            console.log(userdetails);
            const username = userdetails[0].username;
            const session = req.session;
            session.name = username;
            console.log(session);
            userinfo = { name: username };
            console.log(userinfo);

            console.log(snapshotdetails);
            console.log(defaulttriggerdetails);

            res.render("index", {
              user: userinfo,
              loggedin: isloggedin,
              snapshot: snapshotdetails,
              defaulttriggers: defaulttriggerdetails,
            });

        } catch (err) { 
            console.log(err);
        }
    } else {
        res.redirect('/login');
    }
};

exports.getAddNewSnapshot = async (req, res) => {

    const { isloggedin } = req.session;
    console.log(`User logged in: ${isloggedin}`);

    if (isloggedin) {
        res.render('addsnapshot');
    } else {
        res.redirect('/');
    }
};

exports.selectSnapshot = async (req, res) => {

    const { isloggedin} = req.session;
    console.log(`User logged in: ${isloggedin}`);

    if (isloggedin) {

        const { id } = req.params;
        const vals = [{ id }];
        
        const snapshotSQL = `SELECT * FROM emotional_snapshot WHERE emotional_snapshot.emotional_snapshot_id = ${id}`;
        const defaulttriggerSQL = `SELECT default_trigger.default_trigger_name FROM snapshot_default_trigger 
                        INNER JOIN default_trigger ON
                        snapshot_default_trigger.default_trigger_id = default_trigger.default_trigger_id
                        WHERE emotional_snapshot_id = ${id}`;
        
        try {
                        
            const [snapshotdetails, fielddata1] = await conn.query(snapshotSQL, vals);
            const [defaulttriggerdetails, fielddata2] = await conn.query(defaulttriggerSQL, vals);

            $f3=>set('defaulttriggerdetails',json_encode($defaulttriggerdetails));

            res.render("editsnapshot", {
              loggedin: isloggedin,
              snapshot: snapshotdetails,
              defaulttriggers: defaulttriggerdetails,
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect('/');
    }
};

exports.postNewSnapshot = async (req, res) => {
    const userid = req.session.userid;
    
    const { new_details, new_date } = req.body;
    const vals = [userid, new_details, new_date];

    const insertSQL = 'INSERT INTO emotional_snapshot (user_id, notes, created_ts) VALUES (?, ?, ?)';

    try {
        const [newsnapshot, fields] = await conn.query(insertSQL, vals);
        console.log(newsnapshot);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

exports.updateSnapshot = async (req, res) => {
    
    const snapshot_id = req.params.id;
    const snapshot_notes = req.body.snapshot_notes;
    const default_trigger_name = req.body.snapshot_default_trigger;
    const vals1 = [snapshot_notes, snapshot_id];
    //const default_trigger_name = req.body.default_trigger_name;
    //const vals2 = [snapshot_id, snapshot_default_triggers.default_trigger_id ];

    const updatesnapshotSQL = 'UPDATE emotional_snapshot SET notes = ? WHERE emotional_snapshot_id = ?';
    const deletedefaulttriggerSQL = `DELETE FROM snapshot_default_trigger WHERE emotional_snapshot_id = ?`
    const defaulttriggerSQL = `SELECT default_trigger.default_trigger_name FROM snapshot_default_trigger 
                        INNER JOIN default_trigger ON
                        snapshot_default_trigger.default_trigger_id = default_trigger.default_trigger_id`;
    //const defaulttriggeridSQL = `SELECT default_trigger_id FROM default_trigger 
    //                    WHERE default_trigger_name = ?`;
    const updatedefaulttriggerSQL = `INSERT INTO snapshot_default_trigger (emotional_snapshot_id, default_trigger_id) VALUES (?, ?)`;
    
    try {
        
        const [updatedsnapshot, fielddata1] = await conn.query(updatesnapshotSQL, vals1);
        const [deleteddefaulttrigger, fielddata2] = await conn.query(deletedefaulttriggerSQL, snapshot_id);
        const [defaulttriggerdetails, fielddata3] = await conn.query(defaulttriggerSQL);
        //const [defaulttriggerid] = await conn.query(defaulttriggeridSQL, default_trigger_name);


        ///const default_trigger_id = (async () => {console.log(await getTriggerByName(default_trigger_name))})() 
        const default_trigger = await getTriggerByName(default_trigger_name);
        
        console.log(default_trigger);
        //default_trigger_id = default_trigger_info[0].default_trigger_id;
        const default_trigger_details = { default_trigger: default_trigger, default_trigger_name: default_trigger_name };
        console.log(default_trigger_details);
        
        const [updateddefaulttrigger, fielddata4] = await conn.query(
                 updatedefaulttriggerSQL,
                 [snapshot_id,
                 default_trigger.default_trigger_id]
               );

            
       
        console.log(updatedsnapshot);
        console.log(updateddefaulttrigger);
        console.log(deleteddefaulttrigger);
        console.log(defaulttriggerdetails);
        console.log(default_trigger);
        
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};


exports.deleteSnapshot = async (req, res) => {
    
    const snapshot_id = req.params.id;

    const deleteSQL = `DELETE FROM emotional_snapshot WHERE emotional_snapshot_id = ${snapshot_id}`;

    try {
        const [deletedsnapshot, fields] = await conn.query(deleteSQL, snapshot_id);
        console.log(deletedsnapshot);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

exports.getLogin = async (req, res) => {
    res.render('login');
};



exports.postLogin = async (req, res) => {

    const { username, userpass } = req.body;

    const checkuserSQL = `SELECT user_id FROM user WHERE user.username = '${ username }'`;

    try {
        const [rows, fields] = await conn.query(checkuserSQL, username);
        const userid = rows[0].user_id;

        const savedhashpass = await getSavedHashPassword(userid);
        console.log(savedhashpass);
        const userpassbcryptmatch = await compareHashPassword(userpass, savedhashpass.password_saltedhash);
        console.log(userpassbcryptmatch);
        const logindetails = [username, userpassbcryptmatch];
        console.log(logindetails);
        console.log(savedhashpass);

       /* 
        const numrows = rows.length;
        console.log(numrows);

        if (numrows > 0) { */

        if (userpassbcryptmatch) {
            const session = req.session;
            session.isloggedin = true;
            session.userid = userid;
            console.log(session);

            res.redirect('/');
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }
};


exports.getLogout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

exports.getRegister = async (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
//add check no current user with that email 
    const new_details = req.body;
    const plain_password = new_details.userpass;

  const userinsertSQL =
    "INSERT INTO user (username, password_saltedhash, email, name, date_of_birth, telephone_no, gender) VALUES (?, ?, ?, ?, ?, ?, ?)";

  try {
      const encryptedpassword = await bcryptPassword(plain_password, saltRounds);
      const vals = [
        new_details.username,
        encryptedpassword,
        new_details.email,
        new_details.name,
        new_details.dob,
        new_details.telephoneno,
        new_details.gender,
      ];
      console.log(encryptedpassword);
      const [newuser, fields] = await conn.query(userinsertSQL, vals);
      console.log(newuser);
    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
};