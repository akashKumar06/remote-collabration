import Project from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";

export const isProjectOwner = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(400, "Project ID is required.");
    }

    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(404, "Project not found.");
    }

    // Check if the logged-in user is the owner
    if (project.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Access denied. Only project owner allowed.");
    }

    // Attach project to request for easier access in controller
    req.project = project;

    next();
  } catch (error) {
    next(error);
  }
};
