import { NextFunction, Response } from "express";
import { AuthRequest } from "../types.js";

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "User must be an admin" });
  }

  next();
}
