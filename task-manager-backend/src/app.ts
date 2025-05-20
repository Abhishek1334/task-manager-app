import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middlewares/errorHandler"; 
import { authenticate } from "./middlewares/auth.middleware";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5000",
  "https://task-manager-app-iota-three.vercel.app"
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticate, taskRoutes);

// Error Handler (must be after routes)
app.use(errorHandler);

export default app;
