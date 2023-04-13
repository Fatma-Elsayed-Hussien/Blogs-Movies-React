import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import AddEditBlog from "./Pages/AddEditBlog";
import BlogDetails from "./Pages/BlogDetails";

function App() {
  const [posts, setPosts] = useState([]);

  const handleAddNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleDeletePost = (blog) => {
    setPosts(posts.filter((post) => post._id !== blog._id));
  };

  const handleEditPost = (blog) => {
    setPosts(posts.map((post) => (post._id === blog._id ? { ...blog } : post)));
  };

  const handleUploadImgUser = (updatedUser) =>{
    setPosts(posts.map((post) => (post.user._id === localStorage.getItem("userId") ? {...post, user:updatedUser} : post)))
    localStorage.setItem("userPhoto", updatedUser.photo)
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header handleUploadImgUser={handleUploadImgUser} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                posts={posts}
                setPosts={setPosts}
                handleDeletePost={handleDeletePost}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/post/:postid"
            element={
              <AddEditBlog
                handleAddNewPost={handleAddNewPost}
                handleEditPost={handleEditPost}
              />
            }
          />
          <Route path="/postDetails/:postid" element={<BlogDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
