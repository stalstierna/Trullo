import { Router } from "express";
import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMe,
  loginUser,
} from "../controllers/user.controllers.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

//ME
router.get("/me", auth, getMe);

//POST -Register
router.post("/register", registerUser);

//GET -Login
router.get("/login", loginUser);

//GET
router.get("/", getUsers);

//GET BY ID
router.get("/:id", getUserById);

//PUT
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

export default router;
