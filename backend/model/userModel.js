const { UserModel } = require("../schema/userSchema");
const { environment } = require("../environment");

let bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ContactModel } = require("../schema/contactSchema");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(environment.SENDGRID_API_KEY);

//save methods
const createUser = async (args) => {
  try {
    const findUser = await UserModel.findOne({
      email: new RegExp("^" + args.email + "$", "i"),
    });
    console.log("findUser", findUser);
    // const findUser = await UserModel.findOne({ email: args.email });

    if (findUser) throw "Email Already exists";

    const findAddress = await UserModel.findOne({
      user_address: args.user_address,
    });
    console.log("findAddress", findAddress);

    if (findAddress) throw "The Wallet Address Already exists";

    const isUserExist = await UserModel.findOne({
      user_name: new RegExp("^" + args.user_name + "$", "i"),
    });

    console.log("isUserExist", isUserExist);

    if (isUserExist) throw " The  User name  Already exists";

    var hashPassword = bcrypt.hashSync(args.password, 8);
    // need to add email check if email already exist then do no create player in enjin
    const full_name = args.full_name;
    const user_name = args.user_name;
    const email = args.email;
    const password = hashPassword;
    const phone_number = args.phone_number;
    const user_address = args.user_address;

    const createUserDataIntoDb = await UserModel.create({
      full_name,
      user_name,
      email,
      password,
      phone_number,
      user_address,
    });
    console.log("createUserDataIntoDb", createUserDataIntoDb);

    const token = jwt.sign(
      { id: createUserDataIntoDb._id },
      environment.MY_SECRET,
      {
        expiresIn: "1d",
      }
    );

    let emailObj = {
      to: email,
      from: environment.SENDGRID_OWNER,
      subject: "Account Created",
      text: "Congratulations you have successfully made an account on Bits Platform",
    };
    console.log("emailObj", emailObj);
    const isEmail = await sendEmail(emailObj);
    console.log("isEmail", isEmail);

    if (!createUserDataIntoDb || !isEmail) throw "error";

    createUserDataIntoDb.token = token;

    if (isEmail.status) {
      return createUserDataIntoDb;
    }
  } catch (error) {
    throw new Error(error);
  }
};

//get methods
const loginUser = async (args) => {
  try {
    const findUser = await UserModel.findOne({
      email: new RegExp("^" + args.email + "$", "i"),
    });

    if (!findUser) throw `This Email  is Not Registered on Bits Platform`;

    const password = await bcrypt.compareSync(args.password, findUser.password);
    if (!password) throw "Incorrect Password";

    const token = jwt.sign({ id: findUser._id }, environment.MY_SECRET, {
      expiresIn: "1d",
    });

    const data = {
      token,
      user_address: findUser.user_address,
      full_name: findUser.full_name,
      country: findUser.country,
      bio: findUser.bio,
      id: findUser._id,
      profileImg: findUser.profileImg,
    };
    findUser.is_login = true;
    await findUser.save();
    if (!data) throw "error";

    return data;
  } catch (error) {
    throw new Error(error);
    // throw new ApolloError({ error: error });
  }
};

const updateUserProfile = async (args) => {
  try {
    const { id, full_name, user_address, country, bio, profileImg } = args;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { full_name, user_address, country, bio, profileImg },
      { new: true }
    );

    if (!updatedUser) throw "error";
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

const passwordUpdate = async (id, password, newPassword) => {
  try {
    const data = await UserModel.find({
      $and: [{ _id: id }],
    });

    if (data) {
      const isPassword = await bcrypt.compareSync(password, data[0].password);

      if (!isPassword) throw "Incorrect old password";
      var hashPassword = bcrypt.hashSync(newPassword, 8);
      const updatedPassword = await UserModel.updateOne(
        { _id: id },
        {
          $set: {
            password: hashPassword,
          },
        }
      );
      return updatedPassword;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getProfile = async (id) => {
  try {
    const data = await UserModel.findOne({
      _id: id,
    });
    if (!data) throw "No User Profile Found";
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteProfile = async (id) => {
  try {
    const deletePassword = await UserModel.updateOne(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      }
    );

    if (!deletePassword) throw "No User Profile Found";
    return deletePassword;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const emailUpdate = async (id, password, newEmail) => {
  let pass = password;

  try {
    const emailCheck = await UserModel.findById({
      _id: id,
    });

    if (emailCheck?.email?.toLowerCase() == newEmail.toLowerCase()) {
      throw "New email cannot be same as old email";
    }

    // if user enter existing email then show new email cannot be same as old   and if user want to change email and its is already existing then show email already exist
    const allData = await UserModel.findOne({
      email: new RegExp("^" + newEmail + "$", "i"),
    });

    if (allData) throw "Email already exists";

    const findUser = await UserModel.findById(id);

    const passwordMatch = await bcrypt.compareSync(pass, findUser.password);

    if (!passwordMatch) throw "Password is Incorrect";

    const updatedPassword = await UserModel.updateOne(
      { _id: id },
      {
        $set: {
          email: newEmail,
        },
      }
    );
    return updatedPassword;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//save methods
const addContact = async (args) => {
  try {
    let emailObj = {
      to: environment.SENDGRID_OWNER,
      from: environment.SENDGRID_OWNER,
      subject: `Conact Email From ${args?.full_name}`,
      text: `${args?.message} and here is my phone number ${args?.phone_number} / email ${args?.email}`,
    };
    console.log("emailObj", emailObj);
    const isEmail = await sendEmail(emailObj);

    // const createUserDataIntoDb = await ContactModel.create({
    //   full_name: args.full_name,
    //   email: args.email,
    //   phone_number: args.phone_number,
    //   message: args.message,
    // });

    if (!createUserDataIntoDb) throw "error";
    return createUserDataIntoDb;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

// get contacts
const getAllUsers = async () => {
  try {
    const getData = await UserModel.find({ is_deleted: false });
    if (!getData) throw "error";
    return getData;
  } catch (error) {
    throw new Error(error);
  }
};

const getUsersCount = async () => {
  try {
    const registeredCount = await UserModel.countDocuments();
    if (!registeredCount) throw "error";
    console.log("registeredCount", registeredCount);

    const activeUsersCount = await UserModel.countDocuments({ is_login: true });
    const obj = {
      activeUsersCount: activeUsersCount || 0,
      registeredCount: registeredCount || 0,
    };
    return obj;
  } catch (error) {
    console.log("error", error);

    throw new Error(error);
  }
};

const addNotesUser = async (args) => {
  try {
    let id = args.values.id;
    let noteObj = {
      title: args.values.title,
      description: args.values.description,
      noteImg: args.values.noteImg,
    };

    const updatedPassword = await UserModel.updateOne(
      { _id: id },
      {
        $addToSet: {
          notes: noteObj,
        },
      }
    );

    return { updatedPassword };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//send methods
async function sendEmail(args) {
  try {
    let emailObj = {
      to: "reactdevs777@gmail.com",
      from: "222307@students.au.edu.pk",
      subject: "Hello World",
      text: "Hello plain text world! final",
    };
    const message = {
      to: args.to,
      from: args.from,
      subject: args.subject,
      text: args.text,
    };
    let res = await sgMail.send(message);

    return {
      status: res[0].statusCode,
      message: "Email Send Successfully",
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function allNotifications(args) {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const getData = await UserModel.find({
      is_deleted: false,
      createdAt: { $gte: sevenDaysAgo },
    });

    return getData;
  } catch (error) {
    throw new Error(error);
  }
}

async function newRegistration(args) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const count = await UserModel.countDocuments({
      is_deleted: false,
      createdAt: { $gte: thirtyDaysAgo },
    });

    return count;
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = {
  createUser,
  addNotesUser,
  deleteProfile,
  loginUser,
  updateUserProfile,
  passwordUpdate,
  emailUpdate,
  addContact,
  getAllUsers,
  sendEmail,
  getProfile,
  getUsersCount,
  allNotifications,
  newRegistration
};

