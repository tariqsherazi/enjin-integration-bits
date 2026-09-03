const mongoose = require("mongoose");
const { environment } = require("../environment");

let contactSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phone_number: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model(
  `${environment.PROJECT_NAME}contact`,
  contactSchema
);
module.exports = { ContactModel };
