const { user, todoItem, todoList } = require("./models");

//If we wanted to only include the name of our Users with the lists we could change the function to:

async function listsWithUsers() {
  const lists = await todoList.findAll({
    include: { model: user, attributes: ["name"] },
  });

  return lists.map((list) => list.get({ plain: true }));
}
//listsWithUsers().then((lists) => console.log(lists));

//get inside each user a todoList key holding an array of the user's lists
async function getUsers() {
  const allUsers = await user.findAll({
    include: { model: todoList, attributes: ["name"] },
  });
  return allUsers.map((user) => user.toJSON());
}

//getUsers().then((users) => console.log(users));

//Get one user by id with his lists.

async function getUserWithList(id) {
  const result = await user.findByPk(id, { include: [todoList] });
  return result.get({ plain: true });
}

//getUserWithList(1).then((user) => console.log("user by id with lists", user));

//Get important TodoItems with the name of the list they belong to.
async function importantTodos() {
  const todos = await todoItem.findAll({
    where: { important: true },
    include: { model: todoList, attributes: ["name"] },
  });
  return todos.map((item) => item.get({ plain: true }));
}

//importantTodos().then((items) => console.log("important todoItems", items));

//Get one user by id with his lists, which also contain their belonging TodoItem's task attribute.

async function fullUserById(id) {
  const result = await user.findByPk(id, {
    include: [
      {
        model: todoList,
        attributes: ["name"],
        include: { model: todoItem, attributes: ["task"] },
      },
    ],
  });
  return result.get({ plain: true });
}

fullUserById(1).then((user) => console.log("User with tasks", user));
