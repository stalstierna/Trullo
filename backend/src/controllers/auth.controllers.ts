import mongoose from "mongoose";

import { UserModel } from "../models/user.model.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { signToken } from "./user.controllers.js";

//REGISTER USER
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

//REGISTER ADMIN
export async function registerAdmin(
  req: Request,
  res: Response
): Promise<void> {
  const { email, password, name, role } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      name,
      role,
      passwordHash,
    });

    const token = signToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}

//LOGIN
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
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
}

//LOGOUT
