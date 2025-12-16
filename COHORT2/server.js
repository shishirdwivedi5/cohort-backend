const express = require('express')
const server = express()
server.use(express.json())
let note = []

//post api
server.post('/note', (req , res)=>{
  note.push(req.body),
  res.json({
    'massage':"data post ",
    'note': note
  })
})
// get
server.get('/note',(req, res)=>{
    res.json({
        massage : " get data ",
        data : note
    })
})
 // patch 
 server.patch("/note/:id",(req,res)=>{
    const id = req.params.id
      const {title , discription} = req.body
      note[id].title = title
      note[id].discription = discription
      res.send("note patch done ")
})

// server . delete
server.delete('/note/:id', (req,res)=>{
   const id = req.params.id
   note.splice(id,id)    
 
 res.send("note delete")
})

server.listen(3000,()=>{
console.log("server start")
})