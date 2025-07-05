import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "user.json");

export const fetchUser = async (req, res) => {
  const rawData = fs.readFileSync(filePath);
  const users = JSON.parse(rawData);
  res.render("index", {
    users,
  });
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const rawData = fs.readFileSync(filePath);
  const users = JSON.parse(rawData);
  const updatedUsers = users.filter((u) => u.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));
  res.redirect("/");
};

export const addUser = (req, res) => {
  const data = fs.readFileSync(filePath);
  const users = JSON.parse(data);
  const { name, age } = req.body;
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = {
    id: newId,
    name,
    age: parseInt(age),
  };
  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.redirect("/");
};

export const fetchUserDetail = async (req, res) => {
  const id = parseInt(req.params.id);
  const rawData = fs.readFileSync(filePath);
  const users = JSON.parse(rawData);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.render("update", { user });
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const users = JSON.parse(fs.readFileSync(filePath));
  const updated = users.map((u) =>
    u.id === id ? { ...u, name, age: parseInt(age) } : u
  );
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
  res.redirect("/");
};
