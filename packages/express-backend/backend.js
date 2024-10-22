// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// // Load environment variables
// dotenv.config();

// // Create Express app
// const app = express();
// const port = 8000;

// // Enable CORS and JSON body parsing
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection using Mongoose
// const { MONGO_CONNECTION_STRING } = process.env;

// mongoose.set("debug", true); // Enable mongoose debug mode (optional)
// mongoose
//   .connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log("MongoDB connection error:", error);
//   });

// // In-memory users data (you will replace this with actual database calls later)
// const users = {
//   users_list: [
//     { id: "xyz789", name: "Charlie", job: "Janitor" },
//     { id: "abc123", name: "Mac", job: "Bouncer" },
//     { id: "ppp222", name: "Mac", job: "Professor" },
//     { id: "yat999", name: "Dee", job: "Aspiring actress" },
//     { id: "zap555", name: "Dennis", job: "Bartender" }
//   ]
// };

// // Helper functions
// const findUserByName = (name) => {
//   return users["users_list"].filter((user) => user["name"] === name);
// };

// const findUserById = (id) => {
//   return users["users_list"].find((user) => user["id"] === id);
// };

// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// };

// const findUsersByNameAndJob = (name, job) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name && user["job"] === job
//   );
// };

// const deleteUserById = (id) => {
//   const index = users["users_list"].findIndex((user) => user["id"] === id);
//   if (index !== -1) {
//     users["users_list"].splice(index, 1);
//     return true;
//   } else {
//     return false;
//   }
// };

// // Routes
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/users", (req, res) => {
//   const name = req.query.name;
//   const job = req.query.job;

//   if (name !== undefined && job !== undefined) {
//     let result = findUsersByNameAndJob(name, job);
//     result = { users_list: result };
//     res.send(result);
//   } else if (name !== undefined) {
//     let result = findUserByName(name);
//     result = { users_list: result };
//     res.send(result);
//   } else {
//     res.send(users);
//   }
// });

// app.get("/users/:id", (req, res) => {
//   const id = req.params.id;
//   let result = findUserById(id);
//   if (result === undefined) {
//     res.status(404).send("Resource not found.");
//   } else {
//     res.send(result);
//   }
// });

// app.post("/users", (req, res) => {
//   const userToAdd = req.body;
//   userToAdd.id = Math.random().toString(36).substr(2, 9); // Generate a random ID
//   const newUser = addUser(userToAdd);
//   res.status(201).send(newUser); // Return status 201 and the new user object
// });

// app.delete("/users/:id", (req, res) => {
//   const id = req.params.id;
//   const result = deleteUserById(id);
//   if (result) {
//     res.status(204).send();
//   } else {
//     res.status(404).send("Resource not found.");
//   }
// });

// // Start Express server after MongoDB connection is established
// mongoose.connection.once("open", () => {
//   app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });
// });



// require('dotenv').config();
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log('MongoDB connection error:', err));
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = 8000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// MongoDB Connection using Mongoose
const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true); // Enable mongoose debug mode (optional)
mongoose
  .connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// In-memory users data (you will replace this with actual database calls later)
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// Helper functions
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true;
  } else {
    return false;
  }
};

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    let result = findUsersByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = Math.random().toString(36).substr(2, 9); // Generate a random ID
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser); // Return status 201 and the new user object
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = deleteUserById(id);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send("Resource not found.");
  }
});

// Start Express server after MongoDB connection is established
mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
