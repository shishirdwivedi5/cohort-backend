const express = require('express')
const app = express()

app.use(express.json()) // middleware 
const note = []
app.post('/home', (req, res) => {

    note.push((req.body))
    res.json({
        'massage': " note responce",
        'note': note
    })
})


app.listen(3000, () => {
    console.log('ha bhai server start hai ')
})