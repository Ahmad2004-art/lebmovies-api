import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import moviesRoutes from "../BLL/routes/moviesRoutes.js";
import userRoutes from "../BLL/routes/userRoutes.js";
import adminRoutes from "../BLL/routes/adminRoutes.js";
import authRoutes from "../BLL/routes/authRoutes.js";
import profileRoutes from "../BLL/routes/profileRoutes.js";
import adminPanelRoutes from "../BLL/routes/adminPanelRoutes.js";
import contactRoutes from "../BLL/routes/contactRoutes.js";
import contactAdminRoutes from "../BLL/routes/contactAdminRoutes.js";


// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: "10mb" })); //for big img size
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: ["http://127.0.0.1:5501", "http://localhost:5501"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);


app.use("/public", express.static("PL/Public"));


app.use("/movies", moviesRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/adminpanel", adminPanelRoutes);
app.use("/contact", contactRoutes);
app.use("/contactadmin", contactAdminRoutes);
// 🟢 Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
