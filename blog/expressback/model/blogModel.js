const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  created_at: {
    type: Date,
    default: Date.now, // Sets the default value to the current date and time
  },
});

const Blog = new mongoose.model("Blog", BlogSchema);

module.exports = Blog;
