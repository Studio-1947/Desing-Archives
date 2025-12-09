import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error.middleware";
import challengeRoutes from "./routes/challenge.routes";
import transcriptionRoutes from "./routes/transcription.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import submissionRoutes from "./routes/submission.routes";
import uploadRoutes from "./routes/upload.routes";
import workshopRoutes from "./routes/workshop.routes";
import mailRoutes from "./routes/mail.routes";
import prisma from "./config/prisma";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/v1/transcribe", transcriptionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/mail", mailRoutes);

// Error handling
app.use(errorHandler);

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
