
const http = require('http') // use http to create server 

const server = http.createServer((req , res)=>{  // here create a server 
    res.end("server start ho chuka hai ")
})

server.listen(3000, () => {        // here server listening a request
console.log(" server start")
<<<<<<< HEAD
})  
// COHORT 1 BHI ADD HO CHUKA HAI 
=======
})   
>>>>>>> 5535f14ed7799da6bb2bdbebb9f3f292c88f3799
