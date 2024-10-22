import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { findAllUsers, findUsersByNameAndJob, findUserById, createUser, findUserByIdAndDelete } from "./services/user-service.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.set("debug", true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.get("/users", async (req, res) => {
  const { name, job } = req.query;

  try {
    if (name && job) {
      const users = await findUsersByNameAndJob(name, job);
      res.status(200).json({ users_list: users });
    } else if (name) {
      const users = await findAllUsers();
      res.status(200).json({ users_list: users });
    } else {
      const users = await findAllUsers();
      res.status(200).json({ users_list: users });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("Resource not found.");
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await findUserByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("Resource not found.");
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
