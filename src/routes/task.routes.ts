import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
  updateStatus,
  assignUser,
} from "../controllers/task.controllers.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

//POST
router.post("/", createTask);

//GET
router.get("/", getTasks);

//GET BY ID
router.get("/:id", getTaskById);

//UPDATE STATUS
router.put("/:id/status", auth, updateStatus);

//ASSIGN
router.put("/:id/assign", assignUser);

//DELETE
router.delete("/:id", deleteTask);

export default router;
