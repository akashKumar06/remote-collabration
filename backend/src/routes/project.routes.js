import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate-request.middleware.js";
import { body } from "express-validator";
import {
  createProject,
  getUserProjects,
} from "../controllers/project.controller.js";
const router = express.Router();

// createProject    POST    /api/projects
// getUserProjects  GET     /api/projects
router
  .route("/")
  .post(
    [body("name").notEmpty().withMessage("Project name is required.")],
    validateRequest,
    checkAuth,
    createProject
  )
  .get(checkAuth, getUserProjects);

export default router;
