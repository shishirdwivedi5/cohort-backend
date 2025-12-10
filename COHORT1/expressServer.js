
const express = require('express') // here initlize a express 

const server  = express() // here craete a express server 

server.get('/home',(req, res)=>{       // here create a route res 
    res.send("heelloo home page ")
})

server.listen(3000,()=>{
    console.log("express server start")  //here server lessining start 
})