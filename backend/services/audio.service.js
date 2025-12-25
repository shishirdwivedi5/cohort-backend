const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

function uplodeImagekit(file) {
  return new Promise((resolve, reject) => {
    // let folderName = ''
    // let resorceName = ''

    // if(file.mimetype.startsWith("image/")){
    //       folderName = "image"
    //       resorceName = "image"

    // }
    //    if(file.mimetype.startsWith("audio/")){
    //       folderName = "audio"
    //       resorceName = "video"

    // }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "audio",
        resource_type: "video",
      },
      (error, result) => {
        if (error) {
          console.log("uplode error ", reject(error));
        } else {
          resolve(result);
        }
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

module.exports = uplodeImagekit;
// {
//     folder: "songs",
//     resource_type: "video", // 🔥 VERY IMPORTANT
//   },
