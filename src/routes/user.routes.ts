import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  deleteMe,
} from "../controllers/user.controllers.js";

import { registerUser, loginUser } from "../controllers/auth.controllers.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

//Auth
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/me", auth, getMe);

//Current user
router.put("/me", auth, updateMe);
router.delete("/me", auth, deleteMe);
// router.put("/me/password", auth, updatePassword);

//Admin user
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
