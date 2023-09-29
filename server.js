const express = require("express");

const app = express();

const PORT = 5000;

const usersController = require("./REST/controller");
console.log("use", usersController);

app.get("/", (req, res) => {
  res.send("<h1>Homepage</h1>");
});

app.get("/users", async (req, res) => {
  const users = await usersController.read();
  res.status(200).json({ data: users });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
