const mongoose = require("mongoose");
const { environment } = require("../environment");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  super_user: {
    type: Boolean,
    default: false
  },
  view_only: {
    type: Boolean,
    default: false
  },
  routes_access: {
    type: [String],
    default: [],
  },
});

const Admin = mongoose.model(`${environment.PROJECT_NAME}admin`, adminSchema);

module.exports = Admin;
