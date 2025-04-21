import mongoose from "mongoose";
import Project from "../models/project.model.js";
import Team from "../models/team.model.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

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

export async function getProjectById(req, res) {
  try {
    const { projectId } = req.params;

    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(400, "Invalid project ID");
    }

    const project = await Project.findById(projectId)
      .populate("owner", "firstname lastname avatar")
      .populate("members.user", "firstname lastname avatar")
      .populate("team", "name")
      .populate("activityLogs.createdBy", "firstname lastname avatar");

    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    return res.status(200).json({
      success: true,
      message: "Project feteched successfully.",
      project,
    });
  } catch (error) {
    console.log("Error in getProjectById", error);
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

export async function addMemberToProject(req, res) {
  try {
    const { projectId } = req.params;
    const { userId, role } = req.body;

    // validate inputs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(projectId)
    )
      throw new ApiError(400, "Invalid Project ID or User ID");

    // find the project
    const project = await Project.findById(projectId);
    if (!project) throw new ApiError(404, "Project not found.");

    // check if user exits
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User to add not found.");

    // Check if the user is the owner
    if (project.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(
        403,
        "Only the project owner is authorized to perform this action"
      );
    }

    // check if user is already a member
    const alreadyMember = project.members.some(
      (member) => member.user.toString() === userId
    );
    if (alreadyMember)
      throw new ApiError(400, "User is already member of project");

    project.members.push({ user: userId, role });

    // log the activity
    project.activityLogs.push({
      message: `${user.firstname} ${
        user.lastname
      } was added to the project as ${role || "member"}.`,
      createdBy: req.user._id,
    });

    await project.save();

    return res
      .status(200)
      .json({ success: true, message: "Member added successfully." });
  } catch (error) {
    console.log("Error in addMemberToProject", error);
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

// updateProject            PUT     /api/projects/:projectId
// deleteProject            DELETE  /api/projects/:projectId
// removeMemberFromProject  DELETE  /api/projects/:projectId/members/:memberId
// assignTeamToProject      POST    /api/projects/:projectId/assign-team
// getProjectTimeline       GET     /api/projects/:projectId/timeline
// getProjectAnalytics      GET     /api/projects/:projectId/analytics
// leaveProject             POST    /api/projects/:projectId/leave
// changeProjectRole        PATCH   /api/projects/:projectId/members/:memberId/role
