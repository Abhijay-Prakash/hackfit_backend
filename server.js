const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://hackfit-2026.vercel.app/"
];


app.use("/api/registrations", require("./routes/registrationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
