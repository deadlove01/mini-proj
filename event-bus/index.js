const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8888;

const events = [];
const subscribers = [
  "http://posts-service:4000",
  "http://comments-service:5000",
  "http://moderated-service:6000",
  "http://query-service:7000",
];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  subscribers.forEach((sub) => {
    console.log(" call url: " + sub);
    axios.post(sub + "/events", event);
  });
  res.send({});
});

app.listen(PORT, () => {
  console.log("services is listening to port: " + PORT);
});
