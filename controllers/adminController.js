const Registration = require("../models/Registration");

// GET ALL REGISTRATIONS (Admin)
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
      .sort({ createdAt: -1 }) // newest first
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await Registration.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: registrations,
    });
  } catch (error) {
    console.error("Admin fetch error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
