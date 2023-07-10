import React from "react";
import BlogDetail from "./BlogDetail";
import BlogDetailSideBar from "./BlogDetailSideBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const MainBlogDetail = () => {
  const { AUname, id } = useParams();
  // console.log(AUname,id)
  const [blogDetails, setBlogDetails] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const res = await axios
        .get(`https://mern-blog-9lrx.vercel.app/blog/getblog/${id}`)
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
    const addView = async()=>{
      const res = await axios.post(`https://mern-blog-9lrx.vercel.app/blog/addview/${id}/view`)
      .then((response)=>{
        console.log(response.data)
      }
      )
      .catch((error)=>{
        console.log(error)
      })
    }
    addView();
  }, [AUname, id]);

  return (
    <>
      <div className="flex justify-between mt-3 bg-white">
        
        <div className="  w-[65%] ">
          <div className="">
            <BlogDetail blogDetails={blogDetails} />
          </div>
        </div>
        
        <div className="">
          <div className="sticky top-[10px] ">
            <BlogDetailSideBar blogDetails={blogDetails} />
          </div>
        </div>
      
      </div>
    </>
  );
};

export default MainBlogDetail;
