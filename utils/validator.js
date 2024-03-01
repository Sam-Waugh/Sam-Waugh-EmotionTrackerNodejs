const { body, validationResult } = require("express-validator");

const loginValidationRules = () => {
    return [
      body("username")
        .exists().withMessage(
          "Username must be entered!")
        .isLength({ min: 3 }).withMessage(
          "Username must be at least 3 characters!")
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage(
          "Username must be alphanumeric!"
        )
    ];
};

const registerValidationRules = () => {
  return [
    body("username")
      .exists()
      .withMessage("Username must be entered!")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters!")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Username must be alphanumeric!"),
    body("password")
      .exists()
      .withMessage("Password must be entered!")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 8 and 20 characters")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Password must be alphanumeric"),
    body("email")
      .exists()
      .withMessage("Email must be entered!")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email must be valid and contain @"),
  ];
};

const snapshotValidationRules = () => {
  return [
    body("notes")
      .isLength({ min: 1, max: 32767 }).withMessage("Notes must be at least 1 character long and less than 32767 characters!")
      .matches(/^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)
      .withMessage(
        "Notes must only contain alphanumeric characters, spaces and special characters!"
      ),
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
        const userdetails = ({ isloggedin } = req.session);
        console.log(extractedErrors);
        console.log(req.path.parse);
        var orig_route = req.originalUrl;
        const unwantedchar = "/";
        while (orig_route.charAt(0) == unwantedchar) orig_route = orig_route.substring(1);
        console.log(`postValidation: orig_route: ${orig_route}`);
        return res.status(422).render(`${orig_route}`, {
          loggedin: userdetails.isloggedin,
          errors: extractedErrors,
        });
    }
    next();
};

module.exports = {
    loginValidationRules,
    registerValidationRules,
    snapshotValidationRules,
    validate,
};
