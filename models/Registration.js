const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  gender: String,
  institution: String,
  semester: String,
  division: String,
  department: String,
  email: String,
  contact: String,
  foodPreference: String,
  residentialStatus: String,
});

const registrationSchema = new mongoose.Schema(
  {
    teamSize: Number,
    teamName: String,

    lead: memberSchema,

    members: [memberSchema],

    payment: {
      contact: String,
      screenshotUrl: String,
    },

    totalAmount: Number,
    submittedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
