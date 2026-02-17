const Registration = require("../models/Registration");

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
