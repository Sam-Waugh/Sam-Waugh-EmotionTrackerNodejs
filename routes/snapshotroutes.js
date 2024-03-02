const express = require("express");
const controller = require("../controllers/snapshotcontrollers");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth.js");
const { check } = require("express-validator");
const {
  validate,
  loginValidationRules,
  registerValidationRules,
  contactValidationRules,
} = require("../middleware/validator.js");

router.get("/", controller.getLandingPage);
router.get("/user/:userid/snapshots", isLoggedIn, controller.getUserSnapshots);
router.get("/user/:userid/new", isLoggedIn, controller.getAddNewSnapshot);
router.get("/user/:userid/edit/:id", isLoggedIn, controller.selectSnapshot);
router.get("/login", controller.getLogin);
router.get("/logout", isLoggedIn, controller.getLogout);
router.get("/register", controller.getRegister);
router.get("/contact", controller.getContact);

router.post(
  "/user/:userid/new",
  check("notes")
    .isLength({ max: 65535 })
    .withMessage("Notes must be less than 65535 characters!"),
  isLoggedIn,
  controller.postNewSnapshot
);
router.post(
  "/user/:userid/edit/:id",
  check("notes")
    .isLength({ min:2, max: 65535 })
    .withMessage("Notes must be less than 65535 characters!"),
  isLoggedIn,
  controller.updateSnapshot
);
router.post("/user/:userid/del/:id", isLoggedIn, controller.deleteSnapshot);
router.post("/login", loginValidationRules(), validate, controller.postLogin);
router.post(
  "/register",
  registerValidationRules(),
  validate,
  controller.postRegister
);
router.post(
  "/contact",
  contactValidationRules(),
  validate,
  controller.postContact
);

module.exports = router;
