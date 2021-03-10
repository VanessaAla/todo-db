const express = require("express");
const PORT = 4000;
const User = require("./models").user;
const app = express();
const TodoList = require("./models").todoList;

//body parser
app.use(express.json());

app.get("/test", (req, res) => {
  res.json("hello from server");
});

//To test your setup, add the following route:
app.post("/echo", (req, res) => {
  res.json(req.body);
});

// Create a new user account {by email, name and password}
app.post("/users", async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!email) {
      res.status(400).send("Must provide an email address");
    } else {
      const newUser = await User.create({ email, name, password });
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

//Create a new user {only by email}
app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

//app.get("/users", async (req, res) => {
//  const users = await User.findAll();
//  res.send(users);
//});

//get a user's information

app.get("/users/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await User.findByPk(userId);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.send(user);
  }
});

//update user's information

app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log("user id: ", userId);
    const userToUpdate = await User.findByPk(userId);
    console.log("user to update ", userToUpdate);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

//get all user's tasks

app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.TodoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

//create a new task

app.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const newList = await TodoList.create({ userId, ...req.body });
      res.json(newList);
    }
  } catch (e) {
    next(e);
  }
});

// Update an existing list
app.put("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toUpdate = await TodoList.findByPk(listId);
    if (!toUpdate) {
      res.status(404).send("List not found");
    } else {
      const updated = await toUpdate.update(req.body);
      res.json(updated);
    }
  } catch (e) {
    next(e);
  }
});

// Delete a user's list
app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toDelete = await TodoList.findByPk(listId);
    if (!toDelete) {
      res.status(404).send("List not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

// Delete all user's lists
app.delete("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, { include: [TodoList] });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      user.TodoLists.forEach(async (list) => await list.destroy());
      res.status(204).send();
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
