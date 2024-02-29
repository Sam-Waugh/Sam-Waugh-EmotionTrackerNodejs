const express = require('express');
const controller = require('../controllers/snapshotcontrollers');
const router = express.Router();
const { isLoggedIn } = require('../utils/auth');
const { check } = require('express-validator');
const { loginValidationRules, validate } = require("../utils/validator.js");


router.get('/', controller.getLandingPage);
router.get('/user/:userid/snapshots', isLoggedIn, controller.getUserSnapshots);
router.get("/user/:userid/new", isLoggedIn, controller.getAddNewSnapshot);
router.get("/user/:userid/edit/:id", isLoggedIn, controller.selectSnapshot);
router.get("/login", controller.getLogin);
router.get("/logout", isLoggedIn, controller.getLogout);
router.get('/register', controller.getRegister);
router.get('/contact', controller.getContact);

router.post("/user/:userid/new", isLoggedIn, controller.postNewSnapshot);
router.post("/user/:userid/edit/:id", isLoggedIn, controller.updateSnapshot);
router.post("/user/:userid/del/:id", isLoggedIn, controller.deleteSnapshot);
router.post('/login', loginValidationRules(), validate, controller.postLogin);
router.post('/register', controller.postRegister);
router.post('/contact', controller.postContact);

module.exports = router;