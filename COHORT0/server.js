
const http = require('http') // use http to create server 

const server = http.createServer((req , res)=>{  // here create a server 
    res.end("server start ho chuka hai ")
})

server.get('/home',(res , res)=>{
    res.send("hello user")         // here responce 
})

server.listen(3000, () => {        // here server listening a request
console.log(" server start")
})  
// COHORT 1 BHI ADD HO CHUKA HAI 
