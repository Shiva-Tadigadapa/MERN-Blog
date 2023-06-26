import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Lottie from "react-lottie";
import animationData from "../../lotties/anima.json";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { loginStart, loginSuccess } from "../../redux/userSlice";
// import user from '../../redux/userSlice'
import { selectUser } from "../../redux/userSlice";
import { logout1 } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img from "../../assets/logo-standard.svg";
import Landing from "../Logout_Nav/Landing";
import SIgnUp from "../Logout_Nav/SIgnUp";
import Login from './/../Logout_Nav/Login'
import SearchBar from "../Login_Nav/SearchBar";
// import { auth, provider } from '../../firebase'
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
function NavBar() {
  const [signUpTrue, setSignUpTrue] = useState(true);
  const [loginTrue, setLoginTrue] = useState(false);

  const setSignUpTrueFunc = () => {
    setSignUpTrue(true);
    setLoginTrue(false);
  };
  const setLoginTrueFunc = () => {
    setSignUpTrue(false);
    setLoginTrue(true);
  };
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const navigate = useNavigate();

  // const [redirect, setRedirect] = useState(false)
  const token = localStorage.getItem("access_token");
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
  useEffect(() => {
    async function send() {
      dispatch(loginStart());
      const res = await axios
        .get("http://localhost:8000/api/profile", config)
        .then((res) => {
          console.log(res);
          dispatch(loginSuccess(res.data));
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

  function singinwithgoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function logout() {
    localStorage.removeItem("access_token");
    dispatch(logout1());
    console.log("logoutdergre");
    navigate("/");
    // setRedirect(false)
  }

  // const currentUser = useSelector(state => state.user)
  // console.log()
  return (
    // <div className='flex justify-between bg-blue-600 text-white p-6'>
    //   <div>
    //     <h1>NavBar</h1>
    //   </div>
    //   <div className='flex justify-around gap-10'>

    //   {currentUser ? (
    //     <div className='flex justify-around gap-10'>
    //       <a>{currentUser.name}</a>
    //       <a><Link to="/home">Home</Link></a>
    //       <a><Link to={`/MyBlogs/${currentUser._id}`}>Blog</Link></a>
    //       <a className='cursor-pointer'
    //       ><Link to="/Profile">Profile</Link></a>
    //       <a onClick={logout}>LogOut</a>
    //       <a><Link to="/createBlog">createBlog</Link></a>
    //     </div>
    //   ) : (
    //     <div className='flex justify-around gap-10'>
    //       <a>Blog</a>
    //       <a><Link to="/singup">Singup</Link></a>
    //       <a><Link to="/login">Login</Link></a>
    //     </div>
    //   )}

    //   </div>

    // </div>
    <>
      {currentUser && currentUser ? (
        null
      ) : (
        <div>
          <div className="    p-4">
            <div className="flex justify-between">
              <img className="w-36" src={img} />
              <div className=" flex   justify-center ">
                <p className="pr-10">About Us</p>
                <p className="pr-10">Write a blog</p>
                <p className="pr-10">Join Us</p>
              </div>
              <div className="flex  items-center justify-center">
                {/* <Link to="/SignUp"> */}
                <p
                  onClick={setSignUpTrueFunc}
                  className="mr-10 rounded-lg tracking-[0.5px] flex  items-center justify-center cursor-pointer   shadow-2xl bg-white pr-5 pt-2 pl-5 pb-2 "
                >
                  Sign Up
                </p>
                {/* </Link> */}
                {/* <Link to="/Login"> */}

                <p
                  onClick={setLoginTrueFunc}
                  className="mr-4 rounded-lg tracking-[0.5px] flex  items-center justify-center cursor-pointer  shadow-2xl bg-white pr-5 pt-2 pl-5 pb-2"
                  >
                  Login Up
                </p>
                  {/* </Link> */}
              </div>
            </div>
          </div>
          <Landing />
          {/* <div>
            <h1 className="text-5xl pl-52 pt-8  font-mono  italic text-sky-900  text-left font-bold">
              Welcome to our{" "}
            </h1>
            <h1 className="text-5xl pl-52 pt-8  font-mono italic text-left text-sky-900 font-bold">
              Blog Community
            </h1>
            <div className=" absolute  left-48  top-42">
              <Lottie
                className=""
                options={defaultOptions}
                height={400}
                width={400}
              />
            </div>
          </div> */}

          {signUpTrue && signUpTrue ? <SIgnUp /> : <Login />}
        </div>
      )}
    </>
  );
}

export default NavBar;
