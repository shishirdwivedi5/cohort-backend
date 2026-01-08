const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AiGemini = require("../services/geminiAi.service");
const UplodeImg = require("../services/image.service");
async function UserController(req, res) {
  const { username, password } = req.body;

  const encreptPass = await bcrypt.hash(password, 10);

  const setUserToDb = await userModel.create({
    username: username,
    password: encreptPass,
  });

  const token = jwt.sign({ id: setUserToDb._id }, process.env.JWT_SECREAT_KEY);
  res.cookie("token", token);

  if (!token) {
    res.status(401).json({ message: "err" });
  } else {
    res.status(200).json({ message: "register succcessfull" });
  }
}

async function LoginController(req, res) {
  const { username, password } = req.body;

  const loginUser = await userModel.findOne({
    username: username,
  });
  if (!loginUser) {
    res.status(401).json({ message: "username not valid" });
    return;
  }

  const bcryptPass = await bcrypt.compare(password, loginUser.password);

  if (!bcryptPass) {
    res.status(401).json({
      message: "username password invaild",
    });
    return;
  }

  const token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECREAT_KEY);
  const cookies = res.cookie("token", token);

  res.status(200).json({ message: "login sussefully" });
}

async function UplodeRoute(req, res) {
  // const { token } = req.cookies;
  //     const files = Array.from(req.files);
  // const buffer = files.map((file) =>{
  //   return file.buffer;
  // });
  // console.log("buffers:", buffer);
  
 
  const buffer = req.file.buffer;
  console.log("buffer:", buffer);
  // const verifyKey = jwt.verify(token, process.env.JWT_SECREAT_KEY);

  // if (!verifyKey) {
  //   return res.status(401).json({ message: "unAuthrentication " });
  // }


 const base64ImageFile = buffer.toString("base64");
  // const base64ImageFileArray = base64ImageFile.map((base64) => {
  //     return base64
  //   });

  try {
    const result = await AiGemini(base64ImageFile);
    console.log("Ai result:", result);
 

    if (!result) {
      res.status(404).json({ message: "file not uplode to Ai" });
    } else {
      res.status(200).json({ message: "uplode sussefully", result: result });
    }

    const uploded = await UplodeImg(buffer);
    
  } catch (error) {
    console.log("error in uplode route:", error);
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
      error: error,
    });
  }
}

module.exports = {
  UserController,
  LoginController,
  UplodeRoute,
};
