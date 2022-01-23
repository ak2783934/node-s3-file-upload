const express = require("express");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, getFileStream } = require("./upload.js");

const app = express();

app.post("/file", upload.single("file"), async (req, res) => {
  const file = req.file;
  console.log("post worked");
  const result = await uploadFile(file);
  console.log(result);
  await unlinkFile(file.path);
  res.send("complete");
});

app.listen(8080, () => console.log("App is listening on port 8080"));
