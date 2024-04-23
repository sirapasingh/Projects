const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/blogApp";

mongoose
  .connect(DB)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log("Connection error", error);
  });
