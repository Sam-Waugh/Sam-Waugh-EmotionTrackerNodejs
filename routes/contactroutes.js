const express = require("express");
const controller = require("../controllers/contactcontrollers.js");
const router = express.Router();
const {
  validate,
  contactValidationRules,
} = require("../middleware/validator.js");

router.get("/contact", controller.getContact);

router.post(
  "/contact",
  contactValidationRules(),
  validate,
  controller.postContact
);

module.exports = router;
