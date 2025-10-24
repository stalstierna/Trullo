import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  deleteMe,
  updatePassword,
} from "../controllers/user.controllers.js";

import {
  registerUser,
  loginUser,
  registerAdmin,
} from "../controllers/auth.controllers.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/requireAdmin.middleware.js";

const router = Router();

//Auth
router.post("/auth/register", registerUser);
router.post("/auth/register-admin", registerAdmin);
router.post("/auth/login", loginUser);
router.get("/me", auth, getMe);

//Current user
router.put("/me", auth, updateMe);
router.delete("/me", auth, deleteMe);
router.put("/me/password", auth, updatePassword);

//Admin user
// router.get("/", auth, requireAdmin, getUsers);
router.get("/", getUsers);
router.get("/:id", auth, requireAdmin, getUserById);
router.put("/:id", auth, requireAdmin, updateUser);
router.delete("/:id", auth, requireAdmin, deleteUser);

export default router;
