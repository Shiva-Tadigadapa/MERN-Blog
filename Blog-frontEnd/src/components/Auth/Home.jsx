import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import HomeLeftBlock from "../Home/HomeLeftBlock";
import HomeRightBlock from "../Home/HomeRightBlock";
// import { useNavigate } from "react-router-dom";

import ExploreHome from "../Home/ExploreHome";
const Home = () => {
  const [personized, setPersonized] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const FsetPersonized = () => {
    setPersonized(true);
    setFeatured(false);
    setTrending(false);
  };
  const FsetFeatured = () => {
    setPersonized(false);
    setFeatured(true);
    setTrending(false);
  };
  const FsetTrending = () => {
    setPersonized(false);
    setFeatured(false);
    setTrending(true);
  };

  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);


  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // 'credentials': 'include'
    },
  };
  const [blogDetails, setBlogDetails] = useState([]);
  const [treandingBlog, setTrendingBlog] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    // console.log('navbar')

    async function send() {
      dispatch(loginStart());
      const res = await axios.get("https://backbone-l7ed.onrender.com/api/profile", config);
      // .then(response=>{
      // console.log(response)
      console.log(res.data);
      dispatch(loginSuccess(res.data));

      // setUsername(response.data)

      // }).catch(err=>{
      // console.log(err)

      // })
    }
    send();
  }, []);

  const singinwithgoogle = async () => {
    // dispatch(loginStart())

    signInWithPopup(auth, provider)
      .then((result) => {
        const res = axios
          .post("https://backbone-l7ed.onrender.com/api/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((response) => {
            // console.log(response.data);
            dispatch(loginSuccess(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // console.log(error)
        dispatch(loginFailure());
      });
  };

  

  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await axios
        .get("https://backbone-l7ed.onrender.com/blog/getallblog")
        .then((response) => {
          // console.log(response.data[0]);

          setBlogDetails(response.data.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllBlogs();
    const getallTrendingBlogs = async () => {
      const res = await axios.get("https://backbone-l7ed.onrender.com/blog/trending")
      .then((response) => {
        // console.log(response.data[0]);
        setTrendingBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      }
      )
    }
    getallTrendingBlogs()
  }, []);

  return (
    <>
    
      

      <div className="flex       bg-gradient-to-r from-[#4b134f] via-[#cc5333] to-[#23074d]  background-animate
 p-4  ">
        <HomeLeftBlock />

        <div
          className=" h-[100%] w-[75%] rounded-xl bg-[--darkmd-color]  grow-[1] mr-3 "
          style={{ boxShadow: " 0 4px 6px rgba(0, 0, 0, 0.1)  " }}
        >
          <div className=" rounded-lg sticky top-[30px] bg-white/20 backdrop-blur-sm ">
            <div className="flex pt-4 pl-5   text-lg font-medium">
              <div onClick={FsetPersonized} className="pr-3">
                {personized ? (
                  <>
                    <div className="hover:bg-[#ddebf8] items-center justify-center flex mr-1 pt-1.5 pl-1.5 pr-1.5 pb-2 rounded-[4px] ">
                      <img
                        className="w-[23px] h-[23px] mr-1"
                        src="\src\assets\compass3.png"
                      />
                      <p className="text-[#1b52df]">Explore</p>
                    </div>
                    <hr className=" border-[1px] border-[#1b52df] rounded-lg" />
                  </>
                ) : (
                  <>
                    <div className="hover:bg-[#ddebf8] flex items-center justify-center mr-1 pt-1.5 pl-1.5 pr-1.5 pb-2 rounded-[4px] ">
                      <img
                        className="w-[23px] h-[23px] mr-1"
                        src="\src\assets\compass.png"
                      />
                      <p>Explore</p>
                    </div>
                  </>
                )}
              </div>
              <div onClick={FsetTrending} className="pr-3">
                {trending ? (
                  <>
                    <div className="hover:bg-[#ddebf8] flex items-center justify-center mr-1 pt-1.5 pl-1.5 pr-1.5 pb-2 rounded-[4px] ">
                      <img
                        className="w-[23px] h-[23px] mr-1 "
                        src="\src\assets\trend1.png"
                      />
                      <p className="text-[#1b52df]">Trending</p>
                    </div>
                    <hr className=" border-[1px] border-[#1b52df] rounded-lg" />
                  </>
                ) : (
                  <>
                    <div className="hover:bg-[#ddebf8] mr-1 flex items-center justify-center pt-1.5 pl-1.5 pr-1.5 pb-2 rounded-[4px] ">
                      <img
                        className="w-[23px] h-[23px] mr-1"
                        src="\src\assets\trend3.png"
                      />
                      <p>Trending</p>
                    </div>
                  </>
                )}
              </div>{" "}
              <div onClick={FsetFeatured}>
                {featured ? (
                  <>
                    <div className="hover:bg-[#ddebf8] flex items-center justify-center mr-1 pt-1.5 pl-1.5 pr-1.5 pb-2 rounded-[4px] ">
                      <img
                        className="w-[23px] h-[23px] mr-1"
                        src="\src\assets\shining1.png"
                      />
                      <p className="text-[#1b52df]">Featured</p>
                    </div>
                    <hr className=" border-[1px] border-[#1b52df] rounded-lg" />
                  </>
                ) : (
                  <>
                    <div className="hover:bg-[#ddebf8] flex items-center justify-center mr-1 pt-1.5 pl-1.5 pr-1.5 pb-2 rounded-[4px] ">
                      <img
                        className="w-[23px] h-[23px] mr-1"
                        src="\src\assets\shining.png"
                      />
                      <p>Featured</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <hr className=" " />
          </div>

          <div className="overflow-hidden">
            {
              personized && 
               


             
                  <>
                  <ExploreHome  blogDetails={blogDetails} />
                  <hr className=" " />
                  </>
                  
                  
                  
                }
                {
              trending &&
                  <ExploreHome blogDetails={treandingBlog} />
                }
          
          </div>
        </div>

        <div className="   h-[100%] sticky top-[30px]">
          <HomeRightBlock />
        </div>
      </div>
    </>
  );
};

export default Home;
