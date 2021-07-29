const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8888;

const events = [];
const subscribers = [
  "http://localhost:4000",
  "http://localhost:5000",
  "http://localhost:6000",
  "http://localhost:7000",
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
  // axios.post("http://localhost:5000/events", event);
  // axios.post("http://localhost:6000/events", event);
  // axios.post("http://localhost:7000/events", event);
  // axios.post("http://localhost:4000/events", event);
  res.send({});
});

app.listen(PORT, () => {
  console.log("services is listening to port: " + PORT);
});
