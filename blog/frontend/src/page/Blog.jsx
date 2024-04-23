import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Blog() {
  const { id } = useParams(); // Extract the ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog(); // Fetch the blog post based on the ID
  }, [id]); // Re-fetch if the ID changes

  if (!blog) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <div>Created at: {blog.created_at} /</div>
    </div>
  );
}

export default Blog;
