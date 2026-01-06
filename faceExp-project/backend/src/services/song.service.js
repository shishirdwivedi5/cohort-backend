const cloudinary = require("cloudinary").v2;
// const streamifire = require("streamifier")


cloudinary.config({ 
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

function SongUplodeCloud (file) {
    return new Promise((resolved , reject)=>{
       cloudinary.uploader.upload_stream({
            folder : "song",
            resource_type : "video"
        },(error , result)=>{
            if(error){
                reject(error)
            }else{
                resolved(result)
            }
        }).end(file.buffer)

        // streamifire.createReadStream(file.buffer).pipe(stream)
    })
}

module.exports = SongUplodeCloud