import Team from "../models/team.model.js";
import { ApiError } from "../utils/ApiError.js";

export async function createTeam(req, res) {
  try {
    const { name, description } = req.body;
    const user = req.user;
    if (!name?.trim()) throw new ApiError(400, "Team name is required");

    const team = new Team({
      name: name.trim(),
      description,
    });

    team.activityLogs.push({ message: `Team created by ${user.firstname}` });
    team.members.push({ user: user._id, role: "Owner" });

    await team.save();
    res.status(201).json({ success: true, data: team });
  } catch (error) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

export async function getAllTeams(req, res) {
  try {
    const userId = req.user._id;
    const teams = await Team.find({
      $or: [{ owner: userId }, { "members.user": userId }],
    })
      .populate("members.user", "name email")
      .populate("project")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

export async function getTeamById(req, res) {
  try {
    const { id } = req.params;

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid team ID");
    }

    const team = await Team.findById(id)
      .populate("project", "name description")
      .populate("members.user", "name email");

    if (!team) {
      throw new ApiError(404, "Team not found");
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updateTeam(req, res) {
  try {
    const { id } = req.params;
    const { name, description, project, members } = req.body;

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid team ID");
    }

    // Validate required fields if provided
    if (name !== undefined && typeof name !== "string") {
      throw new ApiError(400, "Team name must be a string");
    }

    if (project !== undefined && !mongoose.Types.ObjectId.isValid(project)) {
      throw new ApiError(400, "Invalid project ID");
    }

    if (members !== undefined) {
      if (!Array.isArray(members)) {
        throw new ApiError(400, "Members must be an array");
      }
      // Validate each member structure
      for (const member of members) {
        if (!member.user || !mongoose.Types.ObjectId.isValid(member.user)) {
          throw new ApiError(400, "Each member must have a valid user ID");
        }
        if (
          member.role !== undefined &&
          !["lead", "developer", "designer", "qa", "support"].includes(
            member.role
          )
        ) {
          throw new ApiError(400, "Invalid member role");
        }
      }
    }

    const team = await Team.findById(id);
    if (!team) {
      throw new ApiError(404, "Team not found");
    }

    // Update fields if provided
    if (name !== undefined) team.name = name;
    if (description !== undefined) team.description = description;
    if (project !== undefined) team.project = project;
    if (members !== undefined) team.members = members;

    await team.save();

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function deleteTeam(req, res) {
  try {
    const { id } = req.params;

    // Validate team ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid team ID");
    }

    const team = await Team.findById(id);
    if (!team) {
      throw new ApiError(404, "Team not found");
    }

    await Team.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function addTeamActivity(req, res) {
  try {
    const { id } = req.params; // team id
    const { message, createdBy } = req.body;

    // Validate team ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid team ID");
    }

    // Validate required fields
    if (!message || !message.trim()) {
      throw new ApiError(400, "Activity message is required");
    }

    if (!createdBy || !mongoose.Types.ObjectId.isValid(createdBy)) {
      throw new ApiError(400, "Valid createdBy user ID is required");
    }

    const team = await Team.findById(id);
    if (!team) {
      throw new ApiError(404, "Team not found");
    }

    team.activityLogs.push({ message: message.trim(), createdBy });
    await team.save();

    res.status(200).json({
      success: true,
      message: "Activity added successfully",
      activityLogs: team.activityLogs,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function addTeamMember(req, res) {
  try {
    const { id } = req.params; // team ID
    const { user, role = "developer" } = req.body;

    // Validate team ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid team ID");
    }

    // Validate user ID
    if (!user || !mongoose.Types.ObjectId.isValid(user)) {
      throw new ApiError(400, "Valid user ID is required");
    }

    // Validate role
    const validRoles = ["lead", "developer", "designer", "qa", "support"];
    if (!validRoles.includes(role)) {
      throw new ApiError(400, `Role must be one of: ${validRoles.join(", ")}`);
    }

    const team = await Team.findById(id);
    if (!team) {
      throw new ApiError(404, "Team not found");
    }

    // Check if user is already a member
    const isMemberExists = team.members.some(
      (member) => member.user.toString() === user
    );
    if (isMemberExists) {
      throw new ApiError(400, "User is already a team member");
    }

    // Add new member
    team.members.push({ user, role });
    await team.save();

    res.status(200).json({
      success: true,
      message: "Member added successfully",
      members: team.members,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function removeTeamMember(req, res) {
  try {
    const { id, memberId } = req.params; // team ID and user ID to remove

    // Validate team ID and member ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid team ID");
    }
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      throw new ApiError(400, "Invalid member ID");
    }

    const team = await Team.findById(id);
    if (!team) {
      throw new ApiError(404, "Team not found");
    }

    // Check if the member exists in the team
    const memberIndex = team.members.findIndex(
      (member) => member.user.toString() === memberId
    );
    if (memberIndex === -1) {
      throw new ApiError(404, "Member not found in the team");
    }

    // Remove the member
    team.members.splice(memberIndex, 1);
    await team.save();

    res.status(200).json({
      success: true,
      message: "Member removed successfully",
      members: team.members,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updateTeamMemberRole(req, res) {
  try {
    const { id, memberId } = req.params; // team ID and member user ID
    const { role } = req.body;

    // Validate team ID and member ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid team ID");
    }
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      throw new ApiError(400, "Invalid member ID");
    }

    // Validate role
    const validRoles = ["lead", "developer", "designer", "qa", "support"];
    if (!role || !validRoles.includes(role)) {
      throw new ApiError(400, `Role must be one of: ${validRoles.join(", ")}`);
    }

    const team = await Team.findById(id);
    if (!team) {
      throw new ApiError(404, "Team not found");
    }

    // Find the member
    const member = team.members.find(
      (member) => member.user.toString() === memberId
    );
    if (!member) {
      throw new ApiError(404, "Member not found in the team");
    }

    // Update the role
    member.role = role;
    await team.save();

    res.status(200).json({
      success: true,
      message: "Member role updated successfully",
      member,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
