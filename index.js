const express = require("express");
const PORT = 4000;
const User = require("./models").user;
const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
  res.json("hello from server");
});

//To test your setup, add the following route:
app.post("/echo", (req, res) => {
  res.json(req.body);
});

// Create a new user account
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

//app.get("/users", async (req, res) => {
//  const users = await User.findAll();
//  res.send(users);
//});

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
