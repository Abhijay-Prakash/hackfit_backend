const express = require("express");
const router = express.Router();

const { getAllRegistrations, getRegistrationById } = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");


router.get("/registrations", adminAuth, getAllRegistrations);
router.get("/registrations/:id", adminAuth, getRegistrationById);

module.exports = router;
