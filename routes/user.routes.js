const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/authmodel/user.model");
const { blacklist } = require("../blacklist");
const UserRoute = express.Router();
//hii
//jlo
let hlo = hii;
UserRoute.post("/register", async (req, res) => {
  const { name, email, password, age, city } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.json({ msg: "some went wrong" });
      } else {
        await new UserModel({ name, email, password: hash, age, city }).save();
        res.status(200).json({
          msg: "New user sucessfully registered",
          user: { name, email, password: hash, age, city },
        });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: "Not registered", err: error.message });
  }
});

UserRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    bcrypt.compare(password, user.password, function (err, result) {
      var token = jwt.sign({ course: "backend" }, "tejareddy", {
        expiresIn: "7d",
      });
      if (result) {
        res.status(200).json({ msg: "loggedin sucessfull", token: token });
      } else {
        res.send("wrong credentials");
      }
    });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

UserRoute.get("/logout", (req, res) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    blacklist.push(token);
    res.json({ msg: "Your loggedout sucessfully" });
  }
});

module.exports = { UserRoute };
