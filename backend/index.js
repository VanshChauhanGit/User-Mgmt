import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import recordsRoutes from "./routes/records.js";

const app = express();
connectDB();

app.use(helmet());
app.use(express.json());

// CORS - allow your frontend origin
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "https://user-mgmt-f.vercel.app/";
app.use(cors({ origin: FRONTEND_ORIGIN }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/records", recordsRoutes);

// simple health check
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
