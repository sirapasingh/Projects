import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Add from "./page/Add";
import BlogList from "./page/BlogList";
import BlogEdit from "./page/BlogEdit";
import Blog from "./page/Blog";

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/add">Go to add blog</Link>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/add" element={<Add />} />
          <Route path="/blog:id" element={<Blog />} />
          <Route path="/blog/edit:id" element={<BlogEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
