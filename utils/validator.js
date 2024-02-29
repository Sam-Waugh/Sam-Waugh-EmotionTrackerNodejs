const { body, validationResult } = require("express-validator");

const loginValidationRules = () => {
    return [
      body("username")
        .exists()
        .isLength({ min: 3 })
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage(
          "Username must be at least 3 characters and be alphanumeric!"
        )
    ];
};

const registerValidationRules = () => {
  return [
    body("username")
      .exists()
      .isLength({ min: 3 })
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage(
        "Username must be at least 3 characters and be alphanumeric!"
      ),
    body("password")
      .exists()
      .isLength({ min: 8, max: 20 })
      .isEmail()
      .normalizeEmail()
      .withMessage("Password must be between 8 and 20 characters"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    if (extractedErrors.length != 0) {
        const userdetails = ({ isloggedid } = req.session);
        return res.status(422).render(req.originalUrl.split("/")[1], {
          loggedin: userdetails.isloggedid,
          error: errors.array()[0].msg,
        });
    }
};

module.exports = {
    loginValidationRules,
    registerValidationRules,
    validate,
};
