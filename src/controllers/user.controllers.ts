import mongoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { UserModel, User } from "../models/user.model.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthRequest } from "../types.js";
import { error } from "console";

//TODO
//Felhantering
//JWT

//HJÄLPFUNKTION SKAPA WEBTOKEN
function signToken(user: HydratedDocument<User>) {
  return jwt.sign(
    { sub: user._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
}

//CREATE/REGISTER
//TODO -Städa vad man får tillbaka
export async function registerUser(req: Request, res: Response): Promise<void> {
  const { email, password, name } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      name,
      passwordHash,
    });

    const token = signToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    const token = signToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
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
//TODO -Bara kunna uppdatera om man e inloggad -token
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
//TODO -Bara kunna radera om man e inloggad -token
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
