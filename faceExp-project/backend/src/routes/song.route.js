const express = require("express");
const upload = require("../multer/multer");
const routes = express.Router();
const SongUplodeCloud = require("../services/song.service");
const songModels = require("../models/song.models");

routes.post("/mood", upload.single("song"), async (req, res) => {
  try {
    const { title, auther, mood } = req.body;

    const result = await SongUplodeCloud(req.file);

    res.status(200).json({
      MESSAGE: "song uplode Cloud ",
    });

    await songModels.create({
      title: title,
      auther: auther,
      song: result.url,
      mood: mood,
    });
  } catch (error) {
    res.send("error", error);
  }
});

routes.get("/mood", async (req, res) => {
  const { mood } = req.query;
  const song = await songModels.find({
    mood: mood,
  });
  res.json(song);
 
});

module.exports = routes;
