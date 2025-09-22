import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

await connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });
