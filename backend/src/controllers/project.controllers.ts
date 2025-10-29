import { ProjectModel } from "../models/project.model.js";
import { TaskModel } from "../models/task.model.js";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.model.js";
import { AuthRequest } from "../types.js";
import { error } from "console";

//CREATE PROJECT
export async function createProject(
  req: Request,
  res: Response
): Promise<void> {
  const { createdBy } = req.body;
  try {
    const project = await ProjectModel.create({
      ...req.body,
      members: createdBy,
    });
    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
}

//CREATE TASK
export async function createTask(req: Request, res: Response) {
  const { projectId } = req.params;

  if (!projectId || !mongoose.isValidObjectId(projectId)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const task = await TaskModel.create({ ...req.body, project: projectId });
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
}

//GET ALL
export async function getProjects(req: Request, res: Response): Promise<void> {
  try {
    const projects = await ProjectModel.find()
      .populate("members")
      .populate("tasks");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to get proejcts" });
  }
}

//GET PROJECT BY ID
export async function getProjectById(
  req: Request,
  res: Response
): Promise<void> {
  const { projectId } = req.params;

  if (!mongoose.isValidObjectId(projectId)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const project = await ProjectModel.findById(projectId)
      .populate("tasks")
      .populate("members");

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to get project" });
  }
}

//ASSIGN MEMBERS
export async function assignMembers(
  req: Request,
  res: Response
): Promise<void> {
  const { projectId } = req.params;
  const { userIds } = req.body;

  if (!mongoose.isValidObjectId(projectId)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { members: { $each: userIds } } },
      {
        new: true,
        runValidators: true,
      }
    ).populate({ path: "members" });

    if (!updatedProject) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
}
