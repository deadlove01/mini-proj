const { v4: uuidv4 } = require("uuid");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  res.send(comments);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = uuidv4();
  const { content } = req.body;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  comments.push({id : commentId, content});
 commentsByPostId[postId] = comments;
  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log("posts services is listening to port: " + PORT);
});
