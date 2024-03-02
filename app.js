const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config({ path: './config.env' });
const session = require('express-session');
const snapshotrouter = require('./routes/snapshotroutes');
const userrouter = require("./routes/userroutes");
const contactrouter = require("./routes/contactroutes");
const path = require('path');

const app = express();

const bodyParser = require("body-parser");

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));

app.use(
  express.static(
    path.join(
      __dirname,
      "node_modules/@mougli/"
    )
  )
);

app.use(express.urlencoded({ extended: true }));
app.timeout = 300000;
app.use(session({
    secret: 'mysecretstring1234', 
    resave: false,  
    saveUninitialized: false 
}));

app.use('/', snapshotrouter);
app.use("/", userrouter);
app.use("/", contactrouter);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

//middleware for parsing JSON in request body
app.use(express.json());

app.listen(process.env.PORT, (err) => {
    if (err) return console.log(err);

    console.log(`Express listening on port ${process.env.PORT}`);
});
