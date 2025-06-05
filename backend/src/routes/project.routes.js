import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate-request.middleware.js";
import { body } from "express-validator";
import {
  acceptProjectInvite,
  addMemberToProject,
  createProject,
  deleteProject,
  getProjectById,
  getUserProjects,
  inviteUserToProject,
  updateProjectDescription,
} from "../controllers/project.controller.js";
import { generateProjectDetails } from "../controllers/ai.controller.js";
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

// acceptInvite POST  /api/projects/accept-invite
router.route("/accept-invite").post(checkAuth, acceptProjectInvite);

router.route("/ai/generate-project").post(checkAuth, generateProjectDetails);
// getProjectById   GET   /api/projects/:projectId
// deleteProject    DELETE  /api/projects/:projectId
router
  .route("/:projectId")
  .get(checkAuth, getProjectById)
  .delete(checkAuth, deleteProject);

// addMemberToProject   POST    /api/projects/:projectId/members
router.route("/:projectId/members").post(checkAuth, addMemberToProject);

// updateProject  PATCH   api/projects/:projectId/update-description
router
  .route("/:projectId/update-description")
  .patch(checkAuth, updateProjectDescription);

// sendInvite   POST  /api/projects/:projectId/invite
router.route("/:projectId/invite").post(checkAuth, inviteUserToProject);

export default router;
