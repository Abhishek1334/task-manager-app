import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
  updateTaskPriority,
  updateTaskStatus,
} from "../controllers/task.controller";

import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Task Routes
router.post("/", asyncHandler(createTask));                 // Create a new task
router.get("/", asyncHandler(getTasks));                    // Get all tasks for user
router.get("/:id", asyncHandler(getTaskById));              // Get task by ID
router.put("/:id", asyncHandler(updateTask));               // Full update
router.patch("/status/:id", asyncHandler(updateTaskStatus));        // Update only status
router.patch("/priority/:id", asyncHandler(updateTaskPriority));    // Update only priority level
router.delete("/:id", asyncHandler(deleteTask));            // Delete task

export default router;
