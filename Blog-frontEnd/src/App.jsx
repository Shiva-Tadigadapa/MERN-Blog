import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react'
import NavBar from './components/Nav/NavBar'
import Enter from './components/Auth/Enter'
// import Login from './components/Auth/Login'

import Register from './components/Auth/Register'
import { BrowserRouter as Router, Route, Routes ,  } from "react-router-dom";
import Home from './components/Auth/Home'
// import Profile from './components/Auth/profile'
// import Profile from './components/Nav/HomeLeftBlock'
import Profile from './components/Profile/Profile'
import CreateBlog from'./components/Create_blog/CreateNewBlog'
import BlogDetail from './components/Blog_Details/BlogDetail'
import Myblogs from './components/User_Blogs/Myblogs'
import EditPost from './components/Create_blog/EditPost'
import SearchDetail from './components/Login_Nav/SearchBar'
import Landing from './components/Logout_Nav/Landing'
import SIgnUp from './components/Logout_Nav/SIgnUp'
import Login from './components/Logout_Nav/Login'
import LoginNav from './components/Login_Nav/LoginNav'
import {useParams} from 'react-router-dom'
import MainBlogDetail from './components/Blog_Details/MainBlogDetail'
// import { useNavigate } from 'react-router-dom';
// import { Navigate } from "react-router-dom";
// import { useDispatch } from 'react-redux'
// import { loginStart, loginSuccess } from './redux/apiCalls'


// import { Navigate } from "react-router-dom";

function App() {
  // const navigate = useNavigate();
 
  // const {m} = useParams()    

  const [redirect, setRedirect] = useState(false)
  const token = localStorage.getItem('access_token')
  
 useEffect(()=>{
  
  console.log(token)
  token?setRedirect(true):setRedirect(false)
 },[])

  
  return (
 
   <div className="App"> 
      <Router>
        {
          redirect? <LoginNav />:null
        }
        {/* <LoginNav /> */}
        {/* <NavBar /> */}
        <Routes>
          <Route path='/' element={<NavBar />}/>
          {/* <Route path='/SignUp' element={<SIgnUp />}/> */}
          {/* <Route path='/Login' element={<Login/>}/> */}
          <Route path="/home" element={<Home />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/createBlog' element={<CreateBlog />} />
          <Route path='/:AUname/:id' element={<MainBlogDetail />} />
          <Route path='/MyBlogs/:u_id' element={<Myblogs />} /> 
          <Route path='/editBlog/:Blog_id' element={< EditPost />} />
          <Route path='/search/:serVal' element={<SearchDetail />} />
          <Route path='/author/:AUname' element={<Profile />} />
          <Route path='/Profile/:AUname' element={<Profile />} />
        </Routes>
      </Router>
      </div>

    
  
  )
}

export default App
