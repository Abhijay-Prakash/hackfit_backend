const Registration = require("../models/Registration");
const mongoose = require("mongoose");


exports.getAllRegistrations = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const query = {};

    if (search) {
      query.teamName = { $regex: search, $options: "i" };
    }

    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalTeams = await Registration.countDocuments(); // 👈 total teams registered

    res.status(200).json({
      success: true,
      totalTeams, // 👈 total teams in database
      currentPage: pageNumber,
      data: registrations,
    });

  } catch (error) {
    console.error("Admin fetch error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};




exports.getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration ID format",
      });
    }

    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error("Error fetching registration detail:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching registration details",
      error: error.message,
    });
  }
};