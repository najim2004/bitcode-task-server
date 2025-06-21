const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const roadmapRoutes = require("./routes/roadmap");
const commentRoutes = require("./routes/comments");
const errorMiddleware = require("./middleware/error");

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/comments", commentRoutes);

// Error Handling
app.use(errorMiddleware);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/roadmapApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
