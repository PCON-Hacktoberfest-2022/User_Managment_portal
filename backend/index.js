const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const userRoute = require("./routes/user");

const app = express();
dotenv.config();

//file storage
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = !fs.existsSync("data/images")
      ? fs.mkdirSync(path.join(__dirname, "data", "images"), {
          recursive: true,
        })
      : "data/images";
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

//middlewares
app.use("/data/images", express.static(path.join(__dirname, "data", "images")));
app.use(cors());
app.use(express.json());
app.use(multer({ storage: diskStorage }).single("file"));

//routes
app.use("/users", userRoute);
app.post("/post-image", (req, res, next) => {
  if (!req.file) {
    return res.status(200).json({ msg: "No file Chosen" });
  }
  return res.status(201).json({
    msg: "File Uploaded",
    filePath: req.file.path.replace(/\\/g, "/"),
  });
});

//mongoose connection
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) console.log(err);
  console.log("Database connected");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started!");
});
