const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();


app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',           
    'https://hackfit-2026.vercel.app', 
    
  ],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'], // include what you need
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-api-key',                       
  ],
  credentials: false,                  
  optionsSuccessStatus: 204,           
}));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

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
