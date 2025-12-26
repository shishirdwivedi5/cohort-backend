
### 🗓️ Day - 4: Mini Notes Project Using Express

---

## 🏗️ Project Overview: Notes API
A **very mini project** to understand basic REST API operations using Express.

### 🔧 Features:
- ✅ Create a note
- 📄 Show all notes
- ❌ Delete a note
- ✏️ Update a note

---

## 🧠 Technologies Used:
- Node.js
- Express.js

---

## 📦 Install Express
```bash
npm install express
```

---

## 🧱 Full Source Code

```js
const express = require('express');
const app = express(); 

app.use(express.json());

let notes = [];

// Root route
app.get('/', (req, res) => {
    res.send('Hello, Cohort!');
});

/* 
POST /notes => { title, content } 
Create a new note
*/
app.post('/notes', (req, res) => {
    console.log(req.body);  
    notes.push(req.body);
    res.json({
        message: "note created successfully",
    });
});

/* 
GET /notes 
Show all notes
*/
app.get('/notes', (req, res) => {
    res.json(notes);
});

/* 
DELETE /notes/:index 
Delete a note at given index
*/
app.delete('/notes/:index', (req, res) => {
    const index = req.params.index;
    delete notes[index];
    res.json({
        message: "note deleted successfully",
    });
});

/* 
PATCH /notes/:index => { title } 
Update a note title at given index
*/
app.patch("/notes/:index", (req, res) => {
    const index = req.params.index;
    const { title } = req.body;
    notes[index].title = title;
    res.json({
        message: "note updated successfully",
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

---

## ✅ How It Works

| Method | Route            | Purpose                  |
|--------|------------------|--------------------------|
| GET    | `/`              | Welcome message          |
| POST   | `/notes`         | Add a new note           |
| GET    | `/notes`         | List all notes           |
| DELETE | `/notes/:index`  | Delete a note by index   |
| PATCH  | `/notes/:index`  | Update title of a note   |

---

🔄 Try sending requests using [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) for testing the APIs.
