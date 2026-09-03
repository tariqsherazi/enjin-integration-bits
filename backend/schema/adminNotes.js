const mongoose = require('mongoose');
const Admin = require('./adminSchema');
const { environment } = require("../environment");

// Define the AdminNotes Schema
const adminNotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Admin
  },
  is_public: {
    type: Boolean,
    default: false
  }
});

// Create the AdminNotes model
const AdminNotes = mongoose.model(`${environment.PROJECT_NAME}note`, adminNotesSchema);

// Export the AdminNotes model
module.exports = AdminNotes;
