import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BlogEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing blog data
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        setError("Failed to load blog data");
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/blog/${id}`, { title, content });
      navigate(`/blog/${id}`); // Navigate back to the blog detail page
    } catch (error) {
      setError("Failed to update blog");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default BlogEdit;
