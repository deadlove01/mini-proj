const { v4: uuidv4 } = require("uuid");
const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 4000;

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = uuidv4();
  const { title } = req.body;
  posts[id] = { id, title };

  axios.post("http://localhost:8888/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("event received: " + type);

  res.send({});
});

app.listen(PORT, () => {
  console.log("posts services is listening to port: " + PORT);
});
