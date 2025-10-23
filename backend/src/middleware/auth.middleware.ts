import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest } from "../types.js";

dotenv.config();

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Invalid or missing token" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      sub: string;
      role: string;
    };

    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
