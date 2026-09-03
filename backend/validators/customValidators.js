const emptyFieldValidation = (values, keys) => {
  // console.log("keys", values, keys);
  keys.map((key) => {
    if (!values[key]) throw new Error(`${key} is required`);
  });
  return "success";
};

const idValidation = (id) => {
  if (!id) throw new Error("id is required");
  else return "success";
};

module.exports = { emptyFieldValidation, idValidation };
