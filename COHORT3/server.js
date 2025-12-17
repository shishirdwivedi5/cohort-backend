const express = require('express')
const server = express()
const connectToDB = require('./src/db/db')
const noteModel = require('./src/models/note.model')
connectToDB()
server.use(express.json())

server.post('/note', async (req, res) => {
  const { title, discription } = req.body
  await noteModel.create({
    title, discription
  })
  res.send('post ho gaya')
})
server.get("/note", async (req, res) => {
  const done = await noteModel.find()
  res.json({
    massage: " massage sand ",
    done
  })
})

server.delete("/note/:id", async (req, res) => {
  const noteid = req.params.id

  await noteModel.findByIdAndDelete({
    _id: noteid
  })
  res.send("delete suss")
})

server.patch("/note/:id", async (req, res) => {
  const noteid = req.params.id
  const { title, discription } = req.body
  await noteModel.findByIdAndUpdate({
    _id: noteid,

  }, {
    title, discription
  })
  res.json({
    massage: "done update "

  })
})

server.listen(3000, () => [
  console.log('server start ')
])