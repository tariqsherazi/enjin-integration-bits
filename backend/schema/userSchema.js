const mongoose = require("mongoose");
const { environment } = require("../environment");

let userSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },

    user_address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },

    profileImg: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    is_login: {
      type: Boolean,
      default: false,
    },
    notes: [
      {
        title: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
        noteImg: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model(`${environment.PROJECT_NAME}user`, userSchema);
module.exports = { UserModel };
