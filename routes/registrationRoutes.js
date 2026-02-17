const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { createRegistration } = require("../controllers/registrationController");

router.post(
  "/",
  upload.single("paymentScreenshot"),
  createRegistration
);

module.exports = router;
