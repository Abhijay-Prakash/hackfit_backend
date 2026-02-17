const express = require("express");
const router = express.Router();

const { getAllRegistrations } = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");


router.get("/registrations", adminAuth, getAllRegistrations);

module.exports = router;
