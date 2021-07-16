const { v4: uuidv4 } = require("uuid");
const express = require("express");

const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


const PORT = 4000;

const posts = {};

app.get('/posts', (req, res) =>{
    res.send(posts);
})

app.post('/posts', (req, res) =>{
    const id = uuidv4();
    const { title } = req.body;
    posts[id] = { id, title };

    res.status(201).send(posts[id]);
});


app.listen(PORT, () => {
  console.log("posts services is listening to port: " + PORT);
});
