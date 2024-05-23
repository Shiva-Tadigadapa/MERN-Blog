import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import BlogDetailSideBar from "./BlogDetailSideBar";
// import {GoKebabVertical} from 'react-icons/go'
import PopoverPopupState from "../Create_blog/PopoverPopupState";
const BlogDetail = (props) => {
  const { AUname, id } = useParams();
  // const [blogDetails,setBlogDetails] = useState([])

  const blogDetails = props.blogDetails;
  // console.log(blogDetails)
  // useEffect(() => {
  //     const getBlog = async () => {
  //         const res = await axios.get(`http://localhost:8000/blog/getblog/${id}`).then((response)=>{
  //             console.log(response.data)
  //             setBlogDetails(response.data)
  //         }).catch((error)=>{
  //             console.log(error)
  //         })
  //     }
  //     getBlog();
  // }, [AUname,id])
  return (
    <>
      <div className="flex   pt-3 pl-10 h-[100%]">
        <div className="bg-[#ffffff] pl-14 rounded-lg h-[100%] w-[58rem]">
          <div className="pt-10 pb-10 pr-10 flex justify-between  items-center">
            <div className="flex justify-center items-center">
              <img
                className="h-[50px] rounded-full"
                src="https://miro.medium.com/v2/resize:fill:176:176/1*kZ7ApQjqvCYB8_08t4avOA.jpeg"
                alt=""
              />
              <div className="pl-3.5">
                <h1>{blogDetails.orginalName}</h1>
                <p className=" text-sm text-gray-600">Mar 29 . 6 min read </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img
                className="mr-1.5 w-[20px] h-[20px]"
                src="\src\assets\heart.png"
              />
              <img
                className="mr-1.5 w-[20px] h-[20px]"
                src="\src\assets\conversation.png"
              />
              {/* <button className='' onClick={handelMenu}> */}
              <PopoverPopupState blogId={id} className="w-[20px] h-[20px] " />
              {/* </button> */}
            </div>
          </div>
          <div>
            <div>
              <h1 className=" text-3xl  tracking-[1.6px] text-gray-700 capitalize">
                {blogDetails.title}
              </h1>
              <img
                className="w-[90%] mt-10 mr-10  mb-10 rounded-[10px]"
                src={blogDetails.image}
                alt=""
              />
              <p
                className="w-[90%]   leading-[30px] text-[20px] break-all"
                dangerouslySetInnerHTML={{ __html: blogDetails.content }}
              ></p>
            </div>
          </div>
        </div>
        <span className="border block "></span>
        <div className="sticky top-[20px]"></div>
      </div>
    </>
  );
};

export default BlogDetail;
