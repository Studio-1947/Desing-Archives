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
import archiveRoutes from "./routes/archive.routes";
import contactRoutes from "./routes/contact.routes";
import discussionRoutes from "./routes/discussion.routes";
import prisma from "./config/prisma";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false, // Required for Swagger UI if using helmet
}));
app.use(morgan("dev"));

setupSwagger(app);

// Routes
/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint to check if backend is running
 *     responses:
 *       200:
 *         description: Backend is running
 */
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: API health check
 *     responses:
 *       200:
 *         description: API is healthy
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/archives", archiveRoutes);
app.use("/api/v1/transcribe", transcriptionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/discussions", discussionRoutes);

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
