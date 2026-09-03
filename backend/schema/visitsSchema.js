const mongoose = require("mongoose");
const { environment } = require("../environment");

const visitSchema = new mongoose.Schema({
  ip_adress: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const VisitModal = mongoose.model(
  `${environment.PROJECT_NAME}visits`,
  visitSchema
);
module.exports = { VisitModal };
