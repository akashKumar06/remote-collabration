import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate-request.middleware.js";
import { body } from "express-validator";
import {
  addMemberToProject,
  createProject,
  getProjectById,
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

// getProjectById   GET   /api/projects/:projectId
router.route("/:projectId").get(checkAuth, getProjectById);

// addMemberToProject   POST    /api/projects/:projectId/members
router.route("/:projectId/members").post(checkAuth, addMemberToProject);

export default router;
