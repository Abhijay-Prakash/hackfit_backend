const Registration = require("../models/Registration");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

exports.createRegistration = async (req, res) => {
  try {
    const { teamSize, teamContact, amount } = req.body;

    const leadData = JSON.parse(req.body.leadData);
    const members = JSON.parse(req.body.members);

    if (!req.file) {
      return res.status(400).json({ message: "Payment screenshot required" });
    }

    // Upload to Cloudinary
    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "hackfit_registrations" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer(req.file.buffer);

    const registration = await Registration.create({
      teamName: leadData.teamName,
      teamSize,
      teamContact,
      amount,
      lead: leadData,
      members,
      paymentScreenshot: result.secure_url,
    });

    res.status(201).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
