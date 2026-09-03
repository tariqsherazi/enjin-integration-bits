export const passwordValidate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "password is required";
  }
  if (!values.newPassword) {
    errors.newPassword = "newPassword is required";
  }
  return errors;
};

export const nameValidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "name is required";
  }
  return errors;
};

export const subAdminValidate = (values) => {
  const errors = {};

  // Validate newEmail
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // Validate newEmail
  if (!values.name) {
    errors.name = "name is required";
  }
  return errors;
};


export const signInValidate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };