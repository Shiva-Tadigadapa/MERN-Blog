import React from "react";
import img from "../../assets/logo-standard.svg";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, logout1 } from "../../redux/userSlice";
import { selectUser } from "../../redux/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
// import Lottie from "react-lottie";
import Lottie from "lottie-react";
import animationData from "../../lotties/anima.json";
import SearchBar from "./SearchBar";
import { NewState } from "use-context-provider";

const LoginNav = () => {
  //  localStorage.removeItem("access_token");
  const authorName = localStorage.getItem("authorName");
  // console.log(authorName, "in login nav");
  const [signUpTrue, setSignUpTrue] = useState(true);
  const [loginTrue, setLoginTrue] = useState(false);
  // const [authorName, setAuthorName] = useState("");
  const [userName, setUserName] = NewState("UserName", "");
  const [Name, setName] = NewState("Name", "");
  const [authorMail, setAuthorMail] = NewState("AuthorMail", "");

  //  setUserName(authorName);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const [redirect, setRedirect] = useState(false);

  // // useEffect(() => {
  // alert("You are already logged in");
  // if (token) {
  //   setRedirect(true);
  //   navigate("/home");
  // } else {
  //   setRedirect(false);
  // }
  // // }, []);

  // const [redirect, setRedirect] = useState(false)

  // console.log(token,"in app")
  // if(!token){
  //   navigate('/')
  // }
  // else{
  //   navigate('/home')
  // }

  // const token = localStorage.getItem('access_token')
  // console.log(token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const currentUser = useSelector(selectUser);
  // console.log(currentUser, "in login nav");
  // console.log(currentUser && currentUser._id, "in login nav");
  const id = currentUser && currentUser._id;
  // console.log(id, "in logidfgfdgdfgdfgn nav")
  // const { _id } = currentUser;
  // console.log(_id, "in login nav")
  useEffect(() => {
    async function send() {
      dispatch(loginStart());
      const res = await axios
        .get("https://backbone-l7ed.onrender.com/api/profile", config)
        .then((res) => {
          console.log(res);
          dispatch(loginSuccess(res.data));
          var newStr = res.data.name.split("");

          for (var i = 0; i < newStr.length; ++i) {
            if (newStr[i] === " ") {
              newStr[i] = "-";
            }
          }
          localStorage.setItem("authorName", `@${newStr.join("")}`);
          setUserName(authorName);
          setName(res.data.name);
          setAuthorMail(res.data.email);

          // setAuthorName(``)
          // navigate('/home')
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
      // setUsername(response.data.name)

      // }).catch(err=>{
      // console.log(err)

      // })
    }
    send();

    // axios.get('http://localhost:8000/api/',config)
    // .then(response=>{
    //   console.log(response.data)
    //   // setRedirect(true)
    //   // navigate('/home')
    // }).catch(err=>{
    //   console.log(err)
    //   // setRedirect(false)
    //   navigate('/')

    // })
  }, []);
  // if(redirect){
  //   return <Navigate to="/home" />
  // }
  // useEffect(() => {
  //   // console.log('navbar')

  //   async function send() {
  //     dispatch(loginStart());
  //     const res = await axios.get("http://localhost:8000/api/profile", config);
  //     // .then(response=>{
  //     // console.log(response)
  //     console.log(res.data);
  //     dispatch(loginSuccess(res.data));

  //     // setUsername(response.data)

  //     // }).catch(err=>{
  //     // console.log(err)

  //     // })
  //   }
  //   send();
  // }, []);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("authorName");
    dispatch(logout1());
    console.log("logoutdergre");
    navigate("/");
    window.location.reload();
    // setRedirect(false)
  }

  return (
    <div className="  bg-[--one-color]    p-4">
      <div className="flex     justify-between">
        <a href="/home" className=" w-36 cursor-pointer">
          <img className="w-36" src={img} />
        </a>
        <div className="hidden lg:block">
          <SearchBar />
        </div>
        {/* <input className='rounded-lg shadow-2xl pr-24 border-none  pl-5' type="text" placeholder='search'/> */}
        <div className=" hidden  lg:flex items-center">
          <div className=" gap-10 flex  text-md   ">
            <a>
              <Link to={`/home`}>Home</Link>
            </a>

            <a>
              <Link to={`/MyBlogs/${id}`}>Blog</Link>
            </a>

            <a className="cursor-pointer">
              <Link to={`/Profile/${authorName}`}>Profile</Link>
            </a>

            <a>
              <Link to="/createBlog">createBlog</Link>
            </a>
          </div>
          <div className="flex  items-center justify-center">
            <p
              onClick={logout}
              className="mr-4  background-animate
          hover:bg-gradient-to-r from-[#ebd9ec] via-[#fdb19c] to-[#d0b0ff]    rounded-lg tracking-[0.5px] flex  items-center justify-center cursor-pointer hover:bg-blue-200 text-gray-900 
          hover:text-gray-900  transition-all  shadow-2xl bg-[#c3cfd4] pr-5 pt-2 pl-5 pb-2"
            >
              logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNav;
