import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import axios from "axios";
import { Image, Shimmer } from "react-shimmer";
import DOMPurify from "dompurify";

const ExploreHome = (props) => {
  let blogDetails1 = props.blogDetails;
  console.log(blogDetails1);
  const [blogDetails, setBlogDetails] = useState([]);

  useEffect(() => {
    setBlogDetails(blogDetails1);
    // console.log(blogDetails)
  }, [blogDetails1]);

  async function handelLike(_id) {
    const res = await axios.post(
      `https://backbone-l7ed.onrender.com/blog/like/${_id}`
    );

    await axios
      .get("https://backbone-l7ed.onrender.com/blog/getallblog/like")
      .then((response) => {
        setBlogDetails(response.data.reverse());
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    blogDetails &&
    blogDetails.map((item) => (
      <div
        className="pl-6 py-5   w-[95%]  mb-6  rounded-3xl border"
        key={item._id}
      >
        <div className="flex gap-1 items-center justify-start">
          <img
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1679571103557/ZBf6AnvIE.png?w=400&h=400&fit=crop&crop=faces&auto=compress,format&format=webp"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex  flex-col">
            <div>
              <span className="text-sm font-semibold text-gray-700 ml-2">
                {item.authorName.startsWith("@")
                  ? item.authorName.substring(1)
                  : item.authorName}
              </span>
            </div>
            <div className=" flex items-center gap-1 -mt-1">
              <span className="text-sm font-semibold text-gray-500 ml-2">
                {item.authorMail}
              </span>
              <div className=" h-1 w-1 rounded-full bg-gray-400 "></div>
              <span className="text-sm font-semibold text-gray-500 ">
                {formatDate(item.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <Link to={`/blog/${item.BlogId}`}>
          <div className="flex py-2 gap-5 items-center justify-start">
            <div className=" w-[65%] gap-2 flex  flex-col">
              <h1 className="text-2xl mt-2 font-semibold text-gray-800">
                {item.title}
              </h1>
              <p
                className="text-md font-normal text-gray-600 truncated-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.content),
                }}
              ></p>
            </div>
            <div>
              <img
                src={item.image}
                alt="blog-image"
                className="w-48 h-28 object-cover rounded-lg"
              />
            </div>
          </div>
        </Link>
        <div className=" flex gap-5  mt-1">
          <div className=" items-center justify-start gap-2 flex font-mono">
            <p className="text-sm font-semibold text-gray-700 ml-2">
              {item.likes} Likes
            </p>
            <div className=" h-1 w-1 rounded-full bg-gray-500 "></div>
            <p className="text-sm font-semibold text-gray-700 ">
              {item.views} Reads
            </p>
          </div>
          <div>
            <div className="flex flex-row gap-2  ">
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 p-2  rounded-md font-semibold text-gray-600 ml-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

export default ExploreHome;
