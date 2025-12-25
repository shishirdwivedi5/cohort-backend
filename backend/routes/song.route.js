const express = require("express");
const upload = require("../multer/cloud.multer");
const router = express.Router();
const uplodeaudio = require("../services/audio.service");
const songModels = require("../models/song.model");

router.post("/post", upload.single("song"), async (req, res) => {
  const { title, mood } = req.body;

  try {
    const cloudResult = await uplodeaudio(req.file, "songs");
    // console.log("CLOUDINARY RESULT:", cloudResult);
    res.status(200).json({ message: "File uploaded successfully" });

    if (cloudResult.url) {
      await songModels.create({
        title: title,
        song: cloudResult.url,
        mood: mood,
      });

      console.log("db uplode done");
    } else {
      console.log("file data base me uplode nhi huyiii haiii");
    }
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({
      message: "file not uplode ",
    });
  }
});

router.get("/mood", async(req,res)=>{
   const {mood} = req.query
   const song =  await songModels.find({
      mood : mood
     })
     console.log(song)
     res.status(200).json({
      message : " hii audio get sussece fulll",
      song: song
     })
})

module.exports = router;
