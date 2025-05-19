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

export async function updateProjectDescription(req, res) {
  try {
    const { projectId } = req.params;
    const { description } = req.body;

    if (
      !description ||
      description.trim() === "" ||
      typeof description !== "string"
    )
      throw new ApiError(400, "Valid description is required.");

    // check if project exists;
    const project = await Project.findById(projectId);
    if (!project) throw new ApiError(404, "Project not found.");

    // check if user is member of the project or not
    const userId = req.user._id;
    const isMember = project.members.some(
      (member) => member.user.toString() === userId.toString()
    );
    if (!isMember)
      throw new ApiError(403, "You are not a member of this project");

    project.description = description;
    project.activityLogs.push({
      message: `Project description was updated by ${req.user.firstname}.`,
      createdBy: req.user._id,
    });
    await project.save();
    return res.status(200).json({
      success: true,
      message: "Project description updated successfully.",
    });
  } catch (error) {
    console.log("Error in updateProjectDescription", error);
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

export async function deleteProject(req, res) {
  try {
    const { projectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(projectId))
      throw new ApiError(400, "Invalid project ID.");

    const project = await Project.findById(projectId);
    if (!project) throw new ApiError(404, "Project not found.");

    if (req.user._id.toString() !== project.owner.toString())
      throw new ApiError(
        403,
        "Only the project owner can delete this project."
      );

    await Project.findByIdAndDelete(projectId);
    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.log("Error in deleteProject", error);
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

// removeMemberFromProject  DELETE  /api/projects/:projectId/members/:memberId
export async function removeMemberFromProject(req, res) {
  try {
    // check does the requester is project owner
    const { projectId, memberId } = req.params;
    if (
      !mongoose.Types.ObjectId.toValid(projectId) ||
      !mongoose.Types.ObjectId.toValid(memberId)
    )
      throw new ApiError(400, "Invalid project ID or member ID");

    // check if project exists
    const project = await Project.findById(projectId);
    if (!project) throw new ApiError(404, "No project found.");

    // prevent owner from removing the project
    if (project.owner.toString() === memberId) {
      throw new ApiError(
        400,
        "The project owner cannot remove themselves from the project."
      );
    }

    // check does member belongs to the project
    const isMember = project.members.some(
      (member) => member.user.toString() === memberId
    );
    if (!isMember)
      throw new ApiError(
        404,
        "The specified member is not part of this project."
      );

    // Pull (remove) the member
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $pull: { members: { user: memberId } }, // remove member
        $push: {
          activityLogs: {
            message: `Member was removed from the project.`,
            createdBy: req.user._id,
          },
        }, // add activity log
      },
      { new: true }
    );

    if (!updatedProject) {
      throw new ApiError(404, "Project not found.");
    }

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    console.log("Error in removeMemberFromProject", error);
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

// assignTeamToProject      POST    /api/projects/:projectId/assign-team
export async function assignTeamToProject(req, res) {
  try {
    const { teamId } = req.body;

    const project = req.project; // from isProjectOwner middleware

    if (!teamId) {
      throw new ApiError(400, "Team ID is required.");
    }

    const team = await Team.findById(teamId).populate(
      "members.user",
      "firstname lastname"
    );

    if (!team) {
      throw new ApiError(404, "Team not found.");
    }

    // Check if project already has a team
    if (project.team) {
      throw new ApiError(
        400,
        "Project already has a team assigned. Remove it first to assign a new one."
      );
    }

    project.team = teamId;

    // Add activity log
    project.activityLogs.push({
      message: `Team "${team.name}" was assigned to the project.`,
      createdBy: req.user._id,
    });

    await project.save();

    // Create notifications for each team member
    const notifications = team.members.map((member) => ({
      user: member.user._id,
      message: `You have been assigned to project "${project.name}".`,
      project: project._id,
    }));

    await Notification.insertMany(notifications);

    res.status(200).json({
      success: true,
      message: "Team assigned to project successfully and notifications sent.",
    });
  } catch (error) {
    console.log("Error in assignTeamToProject", error);
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

// getProjectTimeline       GET     /api/projects/:projectId/timeline
export async function getProjectTimeline(req, res) {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(400, "Project ID is required.");
    }

    const project = await Project.findById(projectId)
      .populate("activityLogs.createdBy", "firstname lastname avatar") // Populate who did the action
      .select("activityLogs name"); // Only fetch activityLogs and project name

    if (!project) {
      throw new ApiError(404, "Project not found.");
    }

    res.status(200).json({
      success: true,
      message: "Project timeline fetched successfully.",
      timeline: project.activityLogs,
    });
  } catch (error) {
    console.log("Error in getProjectTimeline", error);
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

// getProjectAnalytics      GET     /api/projects/:projectId/analytics
export async function getProjectAnalytics(req, res) {}
// leaveProject             POST    /api/projects/:projectId/leave
export async function leaveProject(req, res) {}
// changeProjectRole        PATCH   /api/projects/:projectId/members/:memberId/role
export async function changeProjectRole(req, res) {}
