const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 7000;

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({ status: "OK" });
});

app.listen(PORT, async () => {
  console.log("services is listening to port: " + PORT);
  try {
    const res = await axios.get("http://event-bus-service:8888/events");
    const events = Object.values(res.data || []);
    if (events) {
      events.forEach((item) => {
        console.log("process event: " + item.type);
        handleEvent(item.type, item.data);
      });
    }
  } catch (error) {
    console.log("erro: " + error);
  }
});
