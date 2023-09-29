const fs = require("fs/promises");
const path = require("path");
// console.log("__dirname", __dirname);
// console.log("__filename", __filename);

// console.log("path.join", path.join());
// console.log("path.resolve", path.resolve());
// Заклинання
// path.join(__dirname)

const usersPath = path.join(__dirname, "..", "db", "users.json");

// console.log("usersPath", usersPath);

class FileOperations {
  constructor(path) {
    this.path = path;
  }

  read = async () => {
    const data = await fs.readFile(this.path, "UTF-8");
    return JSON.parse(data);
  };

  display = async () => {
    const users = await this.read();
    console.log("users", users);
  };

  create = async (users) => {
    return await fs.writeFile(this.path, JSON.stringify(users, null, 2));
  };

  update = async (obj) => {
    const users = await this.read();
    users.push(obj);
    return await this.create(users);
  };

  remove = async () => {
    return await fs.unlink(this.path);
  };

  updateOne = async (id, userName) => {
    const users = await this.read();
    const idx = users.findIndex((item) => item.id === id);
    if (idx === -1) {
      console.log(`User with id ${id} not found`);
      return null;
    }
    users[idx].name = userName;

    await this.create(users);
    console.log("users", users[idx]);
    return users[idx];
  };

  removeOne = async (id) => {
    const users = await this.read();
    const idx = users.findIndex((item) => item.id === id);
    if (idx === -1) {
      console.log(`User with id ${id} not found`);
      return null;
    }
    const deletedUser = users.splice(idx, 1);

    await this.create(users);
    console.log("deletedUser", deletedUser);
    return deletedUser;
  };
}

const file = new FileOperations(usersPath);

const users = [
  { id: "1", name: "Denys" },
  { id: "2", name: "Oleh" },
  { id: "3", name: "Ihor" },
  { id: "4", name: "Zemfira" },
];

// file.display(); // Виводить весь файл в консоль
// file.create(users); // Повністю створює файл в папці db
// file.update({ id: "5", name: "Andriy" }); // додає обєкт в кінець масиву користувачів
// file.remove(); // Видаляє повністю весь файл users.json
// file.updateOne("4", "Zemfira Abitova"); // Шукає по id і оновлює імя
// file.removeOne("3"); // Шукає по id і видаляє з масиву
