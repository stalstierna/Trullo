import { Router } from "express";
import {
  assignMembers,
  createProject,
  getProjects,
  createTask,
  getProjectById,
} from "../controllers/project.controllers.js";

import { auth } from "../middleware/auth.middleware.js";

const router = Router();

// //POST
router.post("/", createProject);

// //GET BY ID
router.get("/:projectId", getProjectById);

// //POST
router.post("/:projectId/task", createTask);

// //ASSIGN
router.put("/:projectId/assign", assignMembers);

// //GET
router.get("/", getProjects);

// //UPDATE STATUS
// router.put("/:id/status", auth, updateStatus);

// //DELETE
// router.delete("/:id", deleteTask);

export default router;
