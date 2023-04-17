const { create } = require("domain");
const fs = require("fs");
const path = require("path");

function isJson(path) {
  return path.endsWith(".json");
}

function fileExists(path) {
  return fs.existsSync(path);
}

function readJSON(...JSONfile) {
  const jsonFilePath = path.join(...JSONfile);

  if (isJson(jsonFilePath) && fileExists(jsonFilePath)) {
    return JSON.parse(fs.readFileSync(jsonFilePath).toString());
  } else {
    console.log("file does not exist or its not a json file");
  }
}

function createJSON(JSONfile, JSONcontent, indent = 2) {
  const jsonFilePath = path.join(...JSONfile);

  /* if (fileExists(jsonFilePath)) { */
  return fs.writeFileSync(
    jsonFilePath,
    JSON.stringify(JSONcontent, null, indent)
  );
  /* } else {
    console.log("type a valid path");
  } */
}

function deleteJSON(JSONPath) {
  const jsonFilePath = path.join(...JSONPath);
  fs.unlinkSync(jsonFilePath);
}

function overwriteJSON(JSONfile, JSONcontent, indent = 2) {
  const jsonFilePath = path.join(...JSONfile);
  fs.writeFileSync(jsonFilePath, JSON.stringify(JSONcontent, null, indent));
}

function updateJSON(JSONfile, newContent, indent = 2) {
  const jsonFilePath = path.join(...JSONfile);
  const currentJsonContent = JSON.parse(
    fs.readFileSync(jsonFilePath).toString()
  );
  const nextJsonContent = { ...currentJsonContent, ...newContent };
  fs.writeFileSync(jsonFilePath, JSON.stringify(nextJsonContent, null, indent));
}

module.exports = {
  readJSON,
  createJSON,
  deleteJSON,
  overwriteJSON,
  updateJSON,
};
