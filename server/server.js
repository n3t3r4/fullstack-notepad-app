const fs = require("fs");
const express = require("express");
const jsonHandler = require("./json-handler");
const path = require("path");

const app = express();
app.use(express.json());

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  const home = fs.readFileSync("index.html").toString();
  res.end(home);
});

app.get("/notepads", (req, res) => {
  const files = fs.readdirSync("notepads");
  const userData = files.map((item) => jsonHandler.readJSON("notepads", item));
  res.json(userData);
});

app.get("/notepads/:id", (req, res) => {
  const userId = req.params.id;
  const userData = jsonHandler.readJSON("notepads", `${userId}.json`);
  res.end(JSON.stringify(userData));
});

app.post("/notepads", (req, res) => {
  const dataPath = "notepads";

  const latestId = jsonHandler.readJSON("id.json");

  const newId = latestId.id + 1;

  jsonHandler.updateJSON(["id.json"], { id: newId });

  const jsonPath = [dataPath, `${newId}.json`];

  const content = { id: newId, ...req.body };

  const newPost = jsonHandler.createJSON(jsonPath, content);

  res.end(newPost);
});

app.put("/notepads/:id", (req, res) => {
  const userID = req.params.id;
  const content = {
    userID,
    teste: true,
  };
  jsonHandler.overwriteJSON(["notepads", `${userID}.json`], content);
});

app.patch("/notepads/:id", (req, res) => {
  const userId = req.params.id;
  const userData = jsonHandler.updateJSON(
    ["notepads", `${userId}.json`],
    req.body
  );
  res.json(req.body);
});

app.delete("/notepads/:id", (req, res) => {
  const userId = req.params.id;
  const userData = jsonHandler.deleteJSON(["notepads", `${userId}.json`]);
  res.end(userData);
});

app.listen(8080, () => {
  console.log("server running");
});
