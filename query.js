const User = require("./models").user;
const TodoItem = require("./models").todoItem;

async function getAllUsers() {
  try {
    // This is how we can use a query method to get all the users from the database
    // Selects all rows. Resolves with a (possibly empty) array
    const allUsers = await User.findAll();
    return allUsers.map((user) => user.toJSON());
  } catch (e) {
    console.log(e);
  }
}

//getAllUsers().then((users) => console.log(users));

const getAllItems = async () => {
  try {
    const items = await TodoItem.findAll();
    const cleanLog = items.map((item) => item.get({ plain: true }));
    console.log(cleanLog);
  } catch (e) {
    console.log(e.message);
  }
};
//getAllItems();

const getImportantItems = async () => {
  try {
    const items = await TodoItem.findAll({
      where: { important: true },
    });
    const cleanLog = items.map((item) => item.get({ plain: true }));
    console.log(cleanLog);
  } catch (e) {
    console.log(e.message);
  }
};
//getImportantItems();

const signUpNewUser = async (email, password, name, age) => {
  try {
    const newUser = await User.create({ email, password, name, age });
    console.log(newUser);
  } catch (e) {
    console.log(e.message);
  }
};

signUpNewUser("newguy2@gmail.com", "123", "newGuy", 35);
