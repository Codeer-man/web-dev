const { log } = require("console");
const fs = require("fs");

const path = require("path");

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("new folder create");
}

const filePath = path.join(dataFolder, "example.txt");
fs.writeFileSync(filePath, "wlc to node js");

const readFile = fs.readFileSync(filePath, "utf8");
console.log("file content", readFile);

fs.appendFileSync(filePath, "\nhello world");
