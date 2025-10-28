import mongoose, { Schema, InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // tasks: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Task",
    //   },
    // ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project",
});

export type Project = InferSchemaType<typeof projectSchema>;

export const ProjectModel = mongoose.model("Project", projectSchema);
