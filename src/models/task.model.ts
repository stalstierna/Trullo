import mongoose, { Schema, InferSchemaType, mongo } from "mongoose";

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["to-do", "in progress", "blocked", "done"],
      default: "to-do",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    finishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export type Task = InferSchemaType<typeof taskSchema>;

export const TaskModel = mongoose.model("Task", taskSchema);
