const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

const validationEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "about",
    "skills",
    "photoUrl",
  ];

  const isAllowedEditFields = Object.keys(req.body).every(
    (
      feild // loop through object key from the request body ,and that every field should be include in allowedEditFields
    ) => allowedEditFields.includes(feild)
  );
  return isAllowedEditFields;
};

module.exports = {
  validateSignUpData,
  validationEditProfileData,
};
