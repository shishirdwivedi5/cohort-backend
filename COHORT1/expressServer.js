const express = require('express') // here import express module
const server = express()

server.get('/home',(req,res)=>{
    res.send("hello user")         // here responce 
})

server.listen(3000, ()=>[
    console.log("server start")
])



