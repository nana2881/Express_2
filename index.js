const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Our Database
let Db = [];

// class to mutate our database structure
class User {
  //constructor to pass variable from the class instance
  constructor(name, age, gen) {
    this.name = name;
    this.age = age;
    this.gen = gen;
  }

  //create user method
  addUser() {
    Db = [...Db, { name: this.name, age: this.age, gen: this.gen }];
    return Db;
  }

  //get all users
  static getUsers() {
    return Db;
  }

  //update all users
  static updateUsers(student) {
    const newDb = Db.map((item) => {
      if (item.name == student.name) {
        return student;
      }
      return item;
    });
    Db = newDb;
    return Db;
  }

  //delete user
  static deleteUser(name) {
    const newDb = Db.filter((item) => item.name !== name);
    Db = newDb;
    return Db;
  }
}

//middleware for creating new instances of User
app.use(bodyParser.json());

//Routes and Handlers
//addUser routes

//addUser routes
app.post("/add-User", (req, res) => {
  //receive data from end req.body
  const { name, age, gen } = req.body;

  //creating instance of user
  const student = new User(name, age, gen);
  //adding new user
  student.addUser();

  res.send({ message: "user created successful", data: student });
});

//get all users from the database
app.get("/all-students", (req, res) => {
  const students = User.getUsers();
  res.send({
    message: "all students",
    students,
  });
});

//update user
app.put("/update-students", (req, res) => {
  const student = req.body;
  const updateData = User.updateUsers(student);
  res.send({
    message: "update successful",
    updated_data: updateData,
  });
});

//delete
app.delete("/delete-student", (req, res) => {
  const { name } = req.body;
  const newData = User.deleteUser(name);
  res.send({
    message: "student deleted successfully",
    newData,
  });
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
