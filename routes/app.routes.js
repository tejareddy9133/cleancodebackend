const express = require("express");
const jwt = require("jsonwebtoken");
const { Auth } = require("../middleware/auth.middleware");
const { movieModel } = require("../models/moviemodel/movie.model");

const appRouter = express.Router();

appRouter.get("/home", (req, res) => {
  res.json({ page: "this is home page" });
});

appRouter.get("/movies", async (req, res) => {
  try {
    let data = await movieModel.find();
    res.status(200).json({ msg: "fetched data sucessfully", movieData: data });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

appRouter.post("/admin/movie/create", async (req, res) => {
  const movieData = req.body;

  try {
    await movieModel(movieData).save();
    res.status(200).json({ msg: "posted data sucessfully", movieData });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

appRouter.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let data = await movieModel.findById(id);
    res.status(200).json({ movie: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

appRouter.delete("/movie/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await movieModel.findOneAndDelete({ _id: id });
    res.status(200).json({ msg: "Item deleted sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

appRouter.patch("/movie/edit/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body); //
  try {
    let updatedone = await movieModel.findOneAndUpdate(
      { _id: id },
      { $set: body }
    );
    res.status(200).json({ msg: "Data updated sucessfully", data: updatedone });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
appRouter.get("/series", Auth, (req, res) => {
  res.json({ page: "this is series page" });
});

module.exports = { appRouter };
