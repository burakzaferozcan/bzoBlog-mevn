const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors"); // CORS modülünü ekleyin
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const upload = require("./middlewares/upload");
const path = require("path");
dotenv.config();

const app = express();

// CORS middleware'i kullanın
app.use(cors());

app.use(bodyParser.json());
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
const connectDB = require("./config/db");
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
