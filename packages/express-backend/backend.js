// // // // backend.js
// // // import express from "express";

// // // const app = express();
// // // const port = 8000;

// // // app.use(express.json());

// // // app.get("/", (req, res) => {
// // //   res.send("Hello World!");
// // // });

// // // app.listen(port, () => {
// // //   console.log(`Example app listening at http://localhost:${port}`);
// // // });

// // import express from "express";

// // const app = express();
// // const port = 8000;

// // app.use(express.json());

// // const users = {
// //   users_list: [
// //     {
// //       id: "xyz789",
// //       name: "Charlie",
// //       job: "Janitor"
// //     },
// //     {
// //       id: "abc123",
// //       name: "Mac",
// //       job: "Bouncer"
// //     },
// //     {
// //       id: "ppp222",
// //       name: "Mac",
// //       job: "Professor"
// //     },
// //     {
// //       id: "yat999",
// //       name: "Dee",
// //       job: "Aspiring actress"
// //     },
// //     {
// //       id: "zap555",
// //       name: "Dennis",
// //       job: "Bartender"
// //     }
// //   ]
// // };

// // // Root route
// // app.get("/", (req, res) => {
// //   res.send("Hello World!");
// // });

// // // /users route to get the list of users
// // app.get("/users", (req, res) => {
// //   res.send(users);
// // });

// // app.listen(port, () => {
// //   console.log(`Example app listening at http://localhost:${port}`);
// // });
// import express from "express";

// const app = express();
// const port = 8000;

// app.use(express.json());

// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor"
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspiring actress"
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ]
// };

// // Function to find users by name
// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };

// // Root route
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // /users route to get all users or filter by name
// app.get("/users", (req, res) => {
//   const name = req.query.name;  // Get the query parameter 'name'
//   if (name !== undefined) {
//     let result = findUserByName(name);
//     result = { users_list: result };  // Format the response
//     res.send(result);
//   } else {
//     res.send(users);  // Send all users if no query string is provided
//   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// Helper function to find user by name
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

// Helper function to find user by id
const findUserById = (id) => {
  return users["users_list"].find(
    (user) => user["id"] === id
  );
};

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// /users route to get all users or filter by name
app.get("/users", (req, res) => {
  const name = req.query.name;  // Get the query parameter 'name'
  if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };  // Format the response
    res.send(result);
  } else {
    res.send(users);  // Send all users if no query string is provided
  }
});

// /users/:id route to get a user by id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;  // Get the id from the route parameter
  let result = findUserById(id);  // Find user by id
  if (result === undefined) {
    res.status(404).send("Resource not found.");  // Return 404 if no user found
  } else {
    res.send(result);  // Send the found user
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
