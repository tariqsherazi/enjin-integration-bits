import * as yup from "yup";
// var WAValidator = require("multicoin-address-validator");
// import WAValidator from "multicoin-address-validator";
let valid_token_address = /^0x[0-9a-fA-F]{40}$/;
const uploadValidation = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 50) {
    errors.name = "Must be 50 characters or less";
  }

  if (!values.artist_name1) {
    errors.artist_name1 = "Required";
  } else if (values.artist_name1.length > 50) {
    errors.artist_name1 = "Must be 50 characters or less";
  }
  if (!values.description) {
    errors.description = "Required";
  } else if (values.description.length > 200) {
    errors.description = "Must be 200 characters or less";
  }
  if (!values.video) {
    errors.video = "Required";
  }

  return errors;
};

const mintValidation = (values) => {
  console.log("mint", values);
  const errors = {};

  if (!values.walletAddress) {
    errors.walletAddress = "Required";
  } else if (!valid_token_address.test(values.walletAddress.trim())) {
    errors.walletAddress = "Invalid address format";
  }

  if (!values.supply) {
    errors.supply = "Required";
  }
  if (!values.royalty) {
    errors.royalty = "Required";
  }
  return errors;
};

// const signUpSchema = yup.object().shape({
//   full_name: yup.string().required("Full name is required"),
//   user_name: yup.string().required("Username is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   phone_number: yup
//     .string()
//     .matches(/^\d{10}$/, "Phone number must be 10 digits"),
// });

const signUpSchema = yup.object().shape({
  full_name: yup.string().trim().required("Full name is required"),
  user_name: yup
    .string()
    .trim()
    .matches(/^\S+$/, "Username cannot contain spaces")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email")
    .trim()
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(\S|\S[\S ]*\S)$/, "Password cannot contain consecutive spaces")
    .required("Password is required"),
  phone_number: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
});

const signInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const userEditSchema = yup.object().shape({});

const passwordValidate = (values) => {
  const errors = {};

  // Validate password
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (/\s\s+/.test(values.password)) {
    errors.password = "Password cannot contain consecutive spaces";
  }

  // Validate newPassword
  if (!values.newPassword) {
    errors.newPassword = "New password is required";
  } else if (values.newPassword.length < 6) {
    errors.newPassword = "New password must be at least 6 characters";
  } else if (/\s\s+/.test(values.newPassword)) {
    errors.newPassword = "New password cannot contain consecutive spaces";
  }

  return errors;
};

const contactValidate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "Full name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phoneNumber) {
    // errors.phoneNumber = "Phone number is required";
  } 
  else if (!/^[0-9]+$/.test(values.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number";
  }

  if (!values.message) {
    errors.message = "Message is required";
  }

  return errors;
};

const emailValidate = (values) => {
  const errors = {};

  // Validate newEmail
  if (!values.newEmail) {
    errors.newEmail = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.newEmail)
  ) {
    errors.newEmail = "Invalid email address";
  }

  // Validate newEmail
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

// const addressValidator = (address, network) => {
//   var valid = WAValidator.validate(address, network);
//   if (valid) {
//     return true;
//   } else {
//     return false;
//   }
// };

let userRegix = /^\S+$/;
const editProfileValidate = (values) => {
  const errors = {};

  if (!values.full_name || !values.full_name.trim()) {
    errors.full_name = "Username is required";
  }

  if (!values.userAddress || !values.userAddress.trim()) {
    errors.userAddress = "Address is required";
  } else if (!valid_token_address.test(values.userAddress.trim())) {
    errors.userAddress = "Invalid address format";
  }

  return errors;
};

export {
  uploadValidation,
  mintValidation,
  signUpSchema,
  signInSchema,
  userEditSchema,
  passwordValidate,
  emailValidate,
  contactValidate,
  editProfileValidate,
};
