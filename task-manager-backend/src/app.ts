import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middlewares/errorHandler"; 
import { authenticate } from "./middlewares/auth.middleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors(
	{
		origin : "http://localhost:5173",
		credentials : true
	}
));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticate, taskRoutes);

// Error Handler (must be after routes)
app.use(errorHandler);

export default app;
