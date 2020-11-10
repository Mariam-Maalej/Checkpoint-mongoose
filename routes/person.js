const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// test route
router.get("/test", (req, res) => {
  res.send("this is a test");
});
//Add user
router.post("/addUser", (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  const newPerson = new Person({
    name,
    age,
    favoriteFoods,
  });
  newPerson
    .save()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
//Get all users
router.get("/allUsers", (req, res) => {
  console.log(Person.find());
  Person.find()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
//Get one user
router.get("/findUser/:_id", (req, res) => {
  const { _id } = req.params;
  Person.find({ _id })
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
//Add element to user's favorite Foods
router.put("/addFood/:_id", (req, res) => {
  const { _id } = req.params;
  Person.findOneAndUpdate(
    { _id },
    { $addToSet: { favoriteFoods: "Hamburger" } },
    {
      new: true,
      upsert: true,
    }
  )
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
//Update user's age
router.put("/updateAge/:_id", (req, res) => {
  const { age } = req.body;
  const { _id } = req.params;
  Person.findOneAndUpdate({ _id }, { age })
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
//Find by id and delete
router.delete("/deleteUser/:_id", (req, res) => {
  const { _id } = req.params;
  Person.findOneAndDelete({ _id })
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
//Find by name and delete
router.delete("/deletebyName/:name", (req, res) => {
  const { name } = req.params;
  Person.findOneAndDelete({ name })
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
//Edit user
router.put("/editUser/:_id", (req, res) => {
  const { _id } = req.params;
  Person.findOneAndUpdate({ _id }, { $set: req.body })
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
//Sort by name
router.get("/sort/:favoriteFoods", (req, res) => {
  const { favoriteFoods } = req.params;
  const { name } = req.params;
  Person.find({ favoriteFoods })
    .sort({ name })
    .limit(2)
    .select({age: false})
    .exec()
    .then((users) => res.send(users))
    .catch((err) => console.log(err))
});
//Remove all users
router.delete("/deleteAll", (req, res) => {
  Person.remove()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});

module.exports = router;
