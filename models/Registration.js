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
    teamName: {
      type: String,
      required: true,
    },
    teamSize: {
      type: Number,
      required: true,
    },
    teamContact: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    lead: memberSchema,
    members: [memberSchema],
    paymentScreenshot: {
      type: String, // Cloudinary URL
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
