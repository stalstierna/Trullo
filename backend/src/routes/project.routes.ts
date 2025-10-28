import { Router } from "express";
import {
  assignMembers,
  createProject,
  getProjects,
  createTask,
} from "../controllers/project.controllers.js";

import { auth } from "../middleware/auth.middleware.js";

const router = Router();

// //POST
router.post("/", createProject);

// //POST
router.post("/:projectId/task", createTask);

// //ASSIGN
router.put("/:projectId/assign", assignMembers);

// //GET
router.get("/", getProjects);

// //GET BY ID
// router.get("/:id", getProjectById);

// //UPDATE STATUS
// router.put("/:id/status", auth, updateStatus);

// //DELETE
// router.delete("/:id", deleteTask);

export default router;
