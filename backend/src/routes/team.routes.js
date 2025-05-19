import express from "express";
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addTeamActivity,
  addTeamMember,
  removeTeamMember,
  updateTeamMemberRole,
} from "../controllers/teamController.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(checkAuth);
// Create a new team
router.post("/", createTeam);

// Get all teams
router.get("/", getAllTeams);

// Get a team by ID
router.get("/:teamId", getTeamById);

// Update a team by ID
router.put("/:teamId", updateTeam);

// Delete a team by ID
router.delete("/:teamId", deleteTeam);

// Add activity log to team
router.post("/:teamId/activity", addTeamActivity);

// Add a member to a team
router.post("/:teamId/members", addTeamMember);

// Remove a member from a team
router.delete("/:teamId/members/:memberId", removeTeamMember);

// Update a member's role in a team
router.patch("/:teamId/members/:memberId", updateTeamMemberRole);

export default router;
