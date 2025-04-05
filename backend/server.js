import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// Load environment variables from .env file
dotenv.config();

const __dirname = path.resolve();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173", // Frontend URL (React running on port 5173)
    })
);

// API routes
app.use("/api/v1/", productRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    // Serve static files from the public folder
    app.use(express.static(path.join(__dirname, "backend/public")));
    // Enhanced catch-all with error handling
    const filePath = path.join(__dirname, "backend", "public", "index.html");
    console.log("Attempting to serve:", filePath);
    app.get("/*", (req, res) => {
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("Error serving index.html:", err);
                res.status(500).send("Error loading page");
            }
        });
    });
}

// Start the server and connect to the database
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
