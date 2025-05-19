import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  changeTaskStatus,
  addTaskActivity,
} from "../controllers/taskController.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();

// All routes require authentication
router.use(checkAuth);

// Create a new task
router.post("/", createTask);

// Get all tasks with optional filters (project, team, assignee, etc.)
router.get("/", getAllTasks);

// Get a single task by ID
router.get("/:taskId", getTaskById);

// Update a task
router.put("/:taskId", updateTask);

// Delete a task
router.delete("/:taskId", deleteTask);

// Change status of a task
router.patch("/:taskId/status", changeTaskStatus);

// Add an activity log to a task
router.post("/:taskId/activity", addTaskActivity);

export default router;
