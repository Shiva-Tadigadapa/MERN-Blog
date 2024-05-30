import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import ExploreHome from "../Home/ExploreHome";
import HomeRightBlock from "../Home/HomeRightBlock";
import { TfiRssAlt } from "react-icons/tfi";
import Sticky from "react-stickynode";
import { IoMdTrendingUp } from "react-icons/io";

const Home = () => {
  const [activeTab, setActiveTab] = useState("personized");
  const [blogDetails, setBlogDetails] = useState([]);
  const [trendingBlog, setTrendingBlog] = useState([]);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(loginStart());
        const res = await axios.get(
          "https://backbone-l7ed.onrender.com/api/profile",
          config
        );
        dispatch(loginSuccess(res.data));
      } catch (error) {
        console.error("Error fetching data: ", error);
        dispatch(loginFailure());
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "https://backbone-l7ed.onrender.com/blog/getallInitial"
        );
        setBlogDetails(res.data.reverse());
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    const fetchTrendingBlogs = async () => {
      try {
        const res = await axios.get(
          "https://backbone-l7ed.onrender.com/blog/trending"
        );
        setTrendingBlog(res.data);
      } catch (error) {
        console.error("Error fetching trending blogs: ", error);
      }
    };

    fetchBlogs();
    fetchTrendingBlogs();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const res = await axios.post("https://backbone-l7ed.onrender.com/api/google", {
  //       name: result.user.displayName,
  //       email: result.user.email,
  //       img: result.user.photoURL,
  //     });
  //     dispatch(loginSuccess(res.data));
  //   } catch (error) {
  //     console.error("Error signing in with Google: ", error);
  //     dispatch(loginFailure());
  //   }
  // };

  return (
    <div className="flex     items-start justify-center max-w-[1600px]  bg-white p-4">
      <div className=" ml-10 w-[60%]">
        <div className="rounded-lg w-[100%] mt-2 flex  ">
          <div
            onClick={() => handleTabChange("personized")}
            className={`pr-3 ${
              activeTab === "personized" ? "text-[#0f1525a1]" : ""
            }`}
          >
            <div
              className={`hover:bg-[#EEEEEE] cursor-pointer  items-center justify-center flex px-5 py-1.5 gap-3 rounded-xl ${
                activeTab === "personized" ? "bg-[#EEEEEE]" : ""
              }`}
            >
              <TfiRssAlt />
              <p>Explore</p>
            </div>
          </div>
          <div
            onClick={() => handleTabChange("trending")}
            className={`pr-3 ${
              activeTab === "trending" ? "text-[#0f1525a1]" : ""
            }`}
          >
            <div
              className={`hover:bg-[#EEEEEE] cursor-pointer items-center justify-center flex px-5 py-1.5 gap-2 rounded-xl  ${
                activeTab === "trending" ? "bg-[#EEEEEE]" : ""
              }`}
            >
              <IoMdTrendingUp />

              <p>Trending</p>
            </div>
          </div>
        </div>

        <div className="   flex flex-col   w-[100%]  mt-5">
          {activeTab === "personized" && (
            <ExploreHome blogDetails={blogDetails} />
          )}
          {activeTab === "trending" && (
            <ExploreHome blogDetails={trendingBlog} />
          )}
        </div>
      </div>

      <div className="h-[100%] w-[30%] rounded-xl sticky border top-[30px]">
        <HomeRightBlock />
      </div>
    </div>
  );
};

export default Home;
