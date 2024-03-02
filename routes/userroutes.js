const express = require("express");
const controller = require("../controllers/usercontrollers.js");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth.js");
const {
  validate,
  loginValidationRules,
  registerValidationRules,
} = require("../middleware/validator.js");

router.get("/login", controller.getLogin);
router.get("/logout", isLoggedIn, controller.getLogout);
router.get("/register", controller.getRegister);
router.post("/login", loginValidationRules(), validate, controller.postLogin);
router.post(
  "/register",
  registerValidationRules(),
  validate,
  controller.postRegister
);

module.exports = router;
