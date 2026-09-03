let bcrypt = require("bcryptjs");
const { environment } = require("../environment");
const Admin = require("../schema/adminSchema");
const { sendEmail } = require("./userModel");
const jwt = require("jsonwebtoken");

function generateRandomPassword() {
  const length = Math.floor(Math.random() * 5) + 8; // Generate a length between 8 and 12

  let password = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}

const createAdminAccount = async (args) => {
  try {
    const findUser = await Admin.findOne({
      email: new RegExp("^" + args?.values.email + "$", "i"),
    });
    console.log("findUser", args?.values);
    // const findUser = await Admin.findOne({ email: args.email });

    if (findUser) throw "Email Already exists";

    // need to add email check if email already exist then do no create player in enjin
    const name = args?.values?.name;
    const email = args?.values?.email;
    const view_only = args?.values?.view_only;

    const randomPassword = generateRandomPassword();
    console.log("randomPassword", randomPassword);
    var hashPassword = bcrypt.hashSync(randomPassword, 8);

    const password = hashPassword;

    const createUserDataIntoDb = await Admin.create({
      name,
      email,
      password,
      routes_access: args?.values?.routes,
      view_only,
    });
    console.log("createUserDataIntoDb", createUserDataIntoDb);

    let emailObj = {
      to: email,
      from: environment.SENDGRID_OWNER,
      subject: "Account Created",
      text: `You have invited by BITS admin for account, and here is your passowrd ${randomPassword}`,
    };
    console.log("emailObj", emailObj);
    const isEmail = await sendEmail(emailObj);
    console.log("isEmail", isEmail);

    if (!createUserDataIntoDb || !isEmail) throw "error";

    // createUserDataIntoDb.token = token;

    if (isEmail.status) {
      return createUserDataIntoDb;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const adminLogin = async (args) => {
  try {
    const findUser = await Admin.findOne({
      email: new RegExp("^" + args.email + "$", "i"),
    });

    if (!findUser) throw `This Email  is Not Registered on Bits Admin`;

    const password = await bcrypt.compareSync(args.password, findUser.password);
    console.log("findUser", password);

    if (!password) throw "Incorrect Password";

    const token = jwt.sign({ id: findUser._id }, environment.MY_SECRET, {
      expiresIn: "1d",
    });

    const data = {
      token,
      name: findUser.name,
      email: findUser.email,
    };
    if (!data) throw "error";

    return data;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
    // throw new ApolloError({ error: error });
  }
};

const getAdminByEmail = async (args) => {
  try {
    const findUser = await Admin.findOne({
      email: new RegExp("^" + args.email + "$", "i"),
    });

    if (!findUser) throw `This Email  is Not Registered on Bits Admin`;
    console.log("findUser", findUser);
    return findUser;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
    // throw new ApolloError({ error: error });
  }
};

// Backend Model
const updateAdminName = async (args) => {
  try {
    const id = args?.id;
    console.log("args", args);
    const findUser = await Admin.findById(id);

    if (!findUser) {
      throw new Error("User not found"); // Throw an Error object instead of a string
    }

    findUser.name = args?.name;
    await findUser.save();
    console.log("findUser", findUser);
    return findUser;
  } catch (error) {
    throw new Error(error);
  }
};

const updateAdminPassword = async (id, password, newPassword) => {
  try {
    const data = await Admin.find({
      $and: [{ _id: id }],
    });

    if (data) {
      const isPassword = await bcrypt.compareSync(password, data[0].password);

      if (!isPassword) throw "Incorrect old password";
      var hashPassword = bcrypt.hashSync(newPassword, 8);
      const updatedPassword = await Admin.updateOne(
        { _id: id },
        {
          $set: {
            password: hashPassword,
          },
        }
      );
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  createAdminAccount,
  adminLogin,
  getAdminByEmail,
  updateAdminName,
  updateAdminPassword,
};
