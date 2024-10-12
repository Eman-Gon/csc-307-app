// backend.js
import express from "express";  // ES module syntax for importing Express

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");  // Respond with 'Hello World!' when the root route is accessed
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);  // Output message when server starts
});
