import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Enter from "./components/Auth/Enter";
import Register from "./components/Auth/Register";
import Home from "./components/Auth/Home";
import Profile from "./components/Profile/Profile";
import CreateBlog from "./components/Create_blog/CreateNewBlog";
import MainBlogDetail from "./components/Blog_Details/MainBlogDetail";
import Myblogs from "./components/User_Blogs/Myblogs";
import EditPost from "./components/Create_blog/EditPost";
import SearchDetail from "./components/Login_Nav/SearchBar";
import Landing from "./components/Logout_Nav/Landing";
import SIgnUp from "./components/Logout_Nav/SIgnUp";
import Login from "./components/Logout_Nav/Login";
import LoginNav from "./components/Login_Nav/LoginNav";

function App() {
  const [redirect, setRedirect] = useState(false);
  // const token = localStorage.getItem("access_token");
  // const navigate = useNavigate();

  // // useEffect(() => {
  //   if (token) {
  //     setRedirect(true);
  //     navigate("/home");
  //   } else {
  //     setRedirect(false);
  //   }
  // // }, [token, navigate]);

  return (
    <div className="App">
      <Router>
        {/* {redirect && <LoginNav />} */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/:AUname/:id" element={<MainBlogDetail />} />
          <Route path="/MyBlogs/:u_id" element={<Myblogs />} />
          <Route path="/editBlog/:Blog_id" element={<EditPost />} />
          <Route path="/search/:serVal" element={<SearchDetail />} />
          <Route path="/author/:AUname" element={<Profile />} />
          <Route path="/Profile/:AUname" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
