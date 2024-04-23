import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "./styles/BlogList.css";

function BlogList() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blog");
      setBlogData(response.data.reverse());
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="blogList">
      {blogData.map((data) => (
        <BlogCard
          key={data._id}
          id={data._id}
          title={data.title}
          content={data.content}
          date={data.created_at}
          onDelete={getData}
        />
      ))}
    </div>
  );
}

export default BlogList;
