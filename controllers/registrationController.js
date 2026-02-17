const Registration = require("../models/Registration");

exports.createRegistration = async (req, res) => {
  const {
    teamSize,
    lead,
    members,
    payment,
    totalAmount,
    submittedAt,
  } = req.body;

  const registration = await Registration.create({
    teamSize,
    teamName: lead?.teamName,
    lead,
    members,
    payment,
    totalAmount,
    submittedAt,
  });

  res.status(201).json({
    success: true,
    data: registration,
  });
};
