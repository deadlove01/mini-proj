const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 6000;

const events = [];

const handleCommentCreated = (type, data) => {
  console.log("handleCommentCreated " + type);
  if (type === "CommentCreated" && data.status === "pending") {
    const { id, content, postId } = data;
    const status = content.includes("orange") ? "rejected" : "approved";
    axios.post("http://localhost:8888/events", {
      type: "CommentModerated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }
};

// app.get("/events", (req, res) => {
//   res.send(posts);
// });

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleCommentCreated(type, data);

  // events.push(event);
  // subscribers.forEach((sub) => {
  //   axios.post(sub, event);
  // });
  res.send({ status: "OK" });
});

app.listen(PORT, async () => {
  console.log("services is listening to port: " + PORT);

  const res = await axios.get("http://localhost:8888/events");
  console.log(res.data);
  const events = Object.values(res.data);
  events.forEach((item) => {
    handleCommentCreated(item.type, item.data);
  });
});
