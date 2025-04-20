import Project from "../models/project.model.js";
import Team from "../models/team.model.js";
import { ApiError } from "../utils/ApiError.js";

export async function createProject(req, res) {
  try {
    const { name, teamId } = req.body;
    if (!name) throw new ApiError(400, "Project name is required.");

    let team = null;
    if (teamId) {
      team = await Team.findById(teamId);
      if (!team) throw new ApiError(404, "Team not found.");
    }

    const project = await Project.create({
      name,
      owner: req.user._id,
      team: team ? team._id : undefined,
      members: [
        {
          user: req.user._id,
          role: "owner",
        },
      ],
      activityLogs: [
        {
          message: `Project created by ${req.user.firstname}`,
          createBy: req.user._id,
        },
      ],
    });
    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    console.log("Error in createProject", error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getUserProjects(req, res) {
  try {
    // get the user own projects as well as being part of other projects
    const userId = req.user._id;
    const projects = await Project.find({
      $or: [{ owner: userId }, { "members.user": userId }],
    })
      .populate("owner", "firstname lastname avatar")
      .populate("members.user", "firstname lastname avatar")
      .populate("team");

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log("Error in getUserProjects", error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

// getProjectById           GET     /api/projects/:projectId
// updateProject            PUT     /api/projects/:projectId
// deleteProject            DELETE  /api/projects/:projectId
// addMemberToProject       POST    /api/projects/:projectId/members
// removeMemberFromProject  DELETE  /api/projects/:projectId/members/:memberId
// assignTeamToProject      POST    /api/projects/:projectId/assign-team
// getProjectTimeline       GET     /api/projects/:projectId/timeline
// getProjectAnalytics      GET     /api/projects/:projectId/analytics
// leaveProject             POST    /api/projects/:projectId/leave
// changeProjectRole        PATCH   /api/projects/:projectId/members/:memberId/role
