import mongoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { UserModel, User } from "../models/user.model.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthRequest } from "../types.js";
import { use } from "framer-motion/client";

//TODO
//Felhantering
//JWT

//HJÄLPFUNKTION SKAPA WEBTOKEN
export function signToken(user: HydratedDocument<User>) {
  return jwt.sign(
    { sub: user._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
}

//GET ME
export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = await UserModel.findById(req.user.sub);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

//UPDATE ME
export async function updateMe(req: AuthRequest, res: Response) {
  const { name, email } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user.sub,
      {
        name,
        email,
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
}

//DELETE ME
export async function deleteMe(req: AuthRequest, res: Response) {
  try {
    const user = await UserModel.findByIdAndDelete(req.user.sub);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}

//UPDATE PASSWORD

//-------------------------------------------------------------------------

//GET ALL USERS
export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
}

//GET USER BY ID
export async function getUserById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
}

//UPDATE USER
export async function updateUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
}

//DELETE USER
export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "ID must be valid ObjectID" });
    return;
  }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}
