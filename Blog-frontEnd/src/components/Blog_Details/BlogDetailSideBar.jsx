import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { GetStates } from "use-context-provider";
const BlogDetailSideBar = (props) => {
  const blogDetails = props.blogDetails;

  const { state } = GetStates();
  // console.log(blogDetails)

  const userDetail = useSelector(selectUser);
  // console.log(userDetail)
  const [followBtn, setFollowBtn] = useState(false);
  const [followers, setFollowers] = useState(0);

  // useEffect(() => {
  //   const getFollowing = async () => {
  //     const res = await axios
  //       .get(
  //         `https://backbone-l7ed.onrender.com/api/getFollowing/${blogDetails.authorU}/${userDetail._id}/getfollow`
  //       )
  //       .then((response) => {
  //         setFollowers(response.data.authorUser.followers.length);
  //         setFollowBtn(response.data.isFollowed);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   getFollowing();
  // }, [followBtn, []]);

  const followRequest = () => {
    const followRequest = async () => {
      console.log(blogDetails, userDetail._id);
      const res = await axios
        .post(
          `https://backbone-l7ed.onrender.com/api/followRequest/${blogDetails.authorName}/${userDetail._id}`
        )
        .then((response) => {
          // console.log(response.data);
          // setFollowers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    followRequest();

    console.log("follow request");
  };
  return (
    <div className=" bg-white rounded-lg border overflow-hidden">
      <div className=" w-[23rem]    sticky top-[20px]    ">
        <div className=" relative">
          <div className="w-full bg-black  top-0 overflow-hidden  h-10 absolute -z-[1]"></div>
          <div className=" flex flex-col    pt-6 px-4 justify-start z-[10]">
            <div className=" flex items-center gap-3">
              <img
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <h1 className="text-2xl font-bold pt-5">{state.Name}</h1>
            </div>

            <div className=" flex items-center   gap-5">
              {followBtn ? (
                <button
                  onClick={followRequest}
                  className="bg-slate-600 text-white w-32  mt-3  h-10 rounded-lg"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={followRequest}
                  className="bg-slate-600 text-white w-32  mt-3  h-10 rounded-lg"
                >
                  Follow
                </button>
              )}
              <p className=" text-xl mt-4 font-mono text-gray-500">
                {followers && followers} followers
              </p>
            </div>

            <p className="mt-4 ">Hey 👋,Welcome to my blog.</p>
            <div className="mt-5 mb-5 text-gray-500">
              <p className=" text-xs  font-semibold">JOINED</p>
              <p className=" text-sm">Oct 25, 2020</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSideBar;
