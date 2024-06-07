import React, { useEffect, useState } from "react";
import BlogDetail from "./BlogDetail";
import BlogDetailSideBar from "./BlogDetailSideBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";
import { CiShare1 } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import Confetti from "react-confetti";
import { GetStates } from "use-context-provider";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
const MainBlogDetail = () => {
  const { AUname, id } = useParams();
  const [blogDetails, setBlogDetails] = useState([]);
  const [like, setLike] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  // const { state } = GetStates();
  const userDetail = useSelector(selectUser);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `https://backbone-l7ed.onrender.com/blog/getblog/${id}`
        );
        setBlogDetails(response.data);
        console.log(blogDetails);
      } catch (error) {
        console.log(error);
      }
    };

    getBlog();
    const addView = async () => {
      try {
        const response = await axios.post(
          `https://backbone-l7ed.onrender.com/blog/addview/${id}/view`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    addView();
  }, [AUname, id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `https://backbone-l7ed.onrender.com/blog/like/${id}`
      );
      console.log(response.data);
      setLike(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="lg:flex justify-center gap-4 px-5 py-10 mt-3 bg-[#f5f5f5]">
        <div>
          {/* {showConfetti && <Confetti className="mt-40" width={155} height={155} />} */}
          <div className="p-4 hidden rounded-xl  lg:flex flex-col gap-6 w-full sticky top-[10px]">
            <div
              className="flex justify-between flex-col items-center"
              onClick={handleLike}
            >
              <AiOutlineHeart className="text-3xl hover:text-red-500 hover:cursor-pointer" />
              <p>{(like && like) || (blogDetails && blogDetails.likes)}</p>
            </div>
            <div className="flex justify-between flex-col items-center">
              <FaRegEye className="text-3xl hover:text-red-500 hover:cursor-pointer" />
              <p>{blogDetails && blogDetails.views}</p>
            </div>
            <div className="flex justify-between flex-col items-center">
              <IoBookmarkOutline className="text-3xl hover:text-blue-500 hover:cursor-pointer" />
              <p>0</p>
            </div>
            <div className="flex justify-between flex-col items-center">
              <CiShare1 className="text-3xl font-bold hover:text-green-500 hover:cursor-pointer" />
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border">
          {blogDetails && <BlogDetail blogDetails={blogDetails} />}
        </div>
        <div className="lg:sticky  mt-10 sm:mt-10 lg:mt-0 lg:top-[10px] block lg:block">
          <div className="sticky top-[10px]">
            <BlogDetailSideBar blogDetails={blogDetails} />
          </div>
        </div>  
      </div>
    </>
  );
};

export default MainBlogDetail;
