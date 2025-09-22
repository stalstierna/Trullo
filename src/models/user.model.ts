import mongoose, { Schema, InferSchemaType } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = mongoose.model("User", userSchema);
