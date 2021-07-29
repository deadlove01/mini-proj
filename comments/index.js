const { v4: uuidv4 } = require("uuid");
const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

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
  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;
  axios.post("http://localhost:8888/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId, status: "pending" },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("event received: " + type);

  if (type === "CommentModerated") {
    const { id, content, postId, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    // const comment = commments.find((x) => x.id === id);
    comment.status = status;
    axios.post("http://localhost:8888/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log("posts services is listening to port: " + PORT);
});
