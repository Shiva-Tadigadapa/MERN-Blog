import React from "react";
import BlogDetail from "./BlogDetail";
import BlogDetailSideBar from "./BlogDetailSideBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";
import { CiShare1 } from "react-icons/ci";

const MainBlogDetail = () => {
  const { AUname, id } = useParams();
  // console.log(AUname,id)
  const [blogDetails, setBlogDetails] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const res = await axios
        .get(`https://backbone-l7ed.onrender.com/blog/getblog/${id}`)
        .then((response) => {
          // console.log(response.data)
          setBlogDetails(response.data);
          // console.log(blogDetails)
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getBlog();
    const addView = async () => {
      const res = await axios
        .post(`https://backbone-l7ed.onrender.com/blog/addview/${id}/view`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    addView();
  }, [AUname, id]);

  return (
    <>
      <div className="flex  justify-center  gap-4 px-5 py-10  max-w-[1400px] mt-3 bg-[#f5f5f5]">
        <div>
          <div className=" p-4 rounded-xl flex flex-col gap-6  w-full sticky top-[10px]">
            <div className="flex justify-between flex-col items-center">
              <AiOutlineHeart className=" text-3xl hover:text-red-500 hover:cursor-pointer" />
              <p>0</p>
            </div>
            <div className="flex justify-between flex-col items-center">
              <IoBookmarkOutline className=" text-3xl hover:text-blue-500 hover:cursor-pointer" />
              <p>0</p>
            </div>
            <div className="flex justify-between flex-col items-center">
              <CiShare1 className=" text-3xl font-bold hover:text-green-500 hover:cursor-pointer" />
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="  bg-white rounded-xl   border ">
          {blogDetails && <BlogDetail blogDetails={blogDetails} />}
        </div>
        <div className="sticky top-[10px]">
          <div className="sticky top-[10px]">
            <BlogDetailSideBar blogDetails={blogDetails} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBlogDetail;
