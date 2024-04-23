const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./model/blogModel.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

require("./db/connection.js");

const PORT = 5000;

//Read operation

app.get("/blog", async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json(blog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

//Create operation
app.post("/blog", async (req, res) => {
  const blog = new Blog(req.body);

  try {
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

//Delete operation
app.delete("/blog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.deleteOne({ _id: id });
    if (!blog) {
      return res.status(404).json({
        message: "Blog post not found. Please check the ID and try again.",
      });
    }

    res.status(200).json({ message: "Blog post deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while deleting the blog post. Please try again later.",
    });
  }
});

//Upadte operation
app.put("/blog/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});
