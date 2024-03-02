const express = require("express");
const controller = require("../controllers/snapshotcontrollers");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth.js");
const { check } = require("express-validator");

router.get("/", controller.getLandingPage);
router.get("/user/:userid/snapshots", isLoggedIn, controller.getUserSnapshots);
router.get("/user/:userid/new", isLoggedIn, controller.getAddNewSnapshot);
router.get("/user/:userid/edit/:id", isLoggedIn, controller.selectSnapshot);

router.post(
  "/user/:userid/new",
  check("snapshot_notes")
        .isLength({ max: 65535 })
      .withMessage("Notes must be less than 65535 characters!")
      .matches(/^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)
      .withMessage(
        "Notes must only contain alphanumeric characters, spaces and punctuation!"
      ),
  isLoggedIn,
  controller.postNewSnapshot
);
router.post(
  "/user/:userid/edit/:id",
  check("snapshot_notes")
    .isLength({ max: 65535 })
    .withMessage("Notes must be less than 65535 characters!")
    .matches(/^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)
    .withMessage(
      "Notes must only contain alphanumeric characters, spaces and punctuation"
    ),
  isLoggedIn,
  controller.updateSnapshot
);
router.post("/user/:userid/del/:id", isLoggedIn, controller.deleteSnapshot);

module.exports = router;
