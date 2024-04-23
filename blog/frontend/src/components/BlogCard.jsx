import React from "react";
import axios from "axios";
import "./BlogCard.css";
import { useNavigate } from "react-router-dom";

function BlogCard(props) {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmation = window.confirm(
      `Are you sure you want to delete "${props.title}" ${props.id} ?`
    );
    if (confirmation) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/blog/${props.id}`
        );
        if (response.status === 200) {
          alert("Deleted Successfully");
          props.onDelete();
        } else {
          alert("Error deleting blog. Please try again.");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert("An error occurred while deleting. Please try again.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/blog/edit/${props.id}`);
  };

  const handleMore = (id) => {
    navigate(`/blog:${id}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="blog_card">
            <div className="blog_card_content">
              <h3>{props.title}</h3>
              <p>{props.content}</p>
              <div
                onClick={() => {
                  handleMore(props.id);
                }}
              >
                <h6>Read More</h6>
              </div>
              <div>Created at: {props.date}</div>
              <h3 className="delete-button" onClick={handleDelete}>
                Delete
              </h3>
              <h3 className="edit-button" onClick={handleEdit}>
                Edit
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
