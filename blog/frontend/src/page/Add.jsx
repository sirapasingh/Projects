import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitData = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/blog", {
        title,
        content,
      });
      console.log("posted");
      setResponse("Blog added successfully!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (err) {
      console.log("eroor ");
      setError(err.message);
    }
  };

  useEffect(() => {
    console.log("Called");
  }, [response, error]);

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={submitData}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Blog</button>
      </form>
      {response && <p>{response}</p>}
      {error && <p>Error: {error}</p>}

      <Link to="/">Go to see all Blogs</Link>
    </div>
  );
}

export default Add;
