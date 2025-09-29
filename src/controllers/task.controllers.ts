import { TaskModel } from "../models/task.model.js";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.model.js";
import { AuthRequest } from "../types.js";

//CREATE
export async function createTask(req: Request, res: Response): Promise<void> {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
}

//GET ALL
export async function getTasks(req: Request, res: Response): Promise<void> {
  try {
    const tasks = await TaskModel.find().populate({ path: "assignedTo" });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to get tasks" });
  }
}

//GET TASK BY ID
export async function getTaskById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const task = await TaskModel.findById(id).populate({ path: "assignedTo" });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to get task" });
  }
}

//UPDATE STATUS
export async function updateStatus(
  req: AuthRequest,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    if (status === "done" && task.status !== "done") {
      task.finishedAt = new Date();
      task.finishedBy = req.user.id;
    }
    if (status !== "done" && task.status === "done") {
      task.finishedAt = null as any;
      task.finishedBy = null as any;
    }

    task.status = status;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
}

//ASSIGN USER
export async function assignUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { assignedTo } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { assignedTo },
      {
        new: true,
        runValidators: true,
      }
    ).populate({ path: "assignedTo" });

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
}

//DELETE BY ID
export async function deleteTask(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
}
