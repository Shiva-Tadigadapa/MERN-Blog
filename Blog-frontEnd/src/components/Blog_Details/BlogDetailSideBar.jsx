import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
const BlogDetailSideBar = (props) => {
  const blogDetails = props.blogDetails;
  // console.log(blogDetails)

  const userDetail = useSelector(selectUser);
  // console.log(userDetail)
  const [followBtn, setFollowBtn] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const getFollowing = async () => {
      const res = await axios
        .get(
          `https://mern-blog-9lrx.vercel.app/api/getFollowing/${blogDetails.authorU}/${userDetail._id}/getfollow`
        )
        .then((response) => {
          setFollowers(response.data.authorUser.followers.length);
          setFollowBtn(response.data.isFollowed);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getFollowing();
  }, [followBtn, []]);

  const followRequest = () => {
    const followRequest = async () => {
      const res = await axios
        .post(
          `https://mern-blog-9lrx.vercel.app/api/followRequest/${blogDetails.authorU}/${userDetail._id}`
        )
        .then((response) => {
          console.log(response.data.followers);
          //get the size of the array
          // console.log(response.data.followers.length)
          setFollowers(response.data.followers.length);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    followRequest();

    console.log("follow request");
  };
  return (
    <div className="">
      <div className="bg-[#ffffff] w-[28rem] pl-7  sticky top-[20px]   ">
        <div className="">
          <div className="flex   pt-10  items-center">
            <img
              className="rounded-full h-[4.5rem]"
              src="https://miro.medium.com/v2/resize:fill:176:176/1*kZ7ApQjqvCYB8_08t4avOA.jpeg"
              alt=""
            />
            <div className="flex flex-col pl-4 justify-center">
              <h1 className="text-xl">{blogDetails.orginalName}</h1>
              <p>{followers && followers} followers</p>
            </div>
          </div>
          {followBtn ? (
            <button
              onClick={followRequest}
              className="bg-slate-600 text-white w-24  mt-3  h-10 rounded-lg"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={followRequest}
              className="bg-slate-600 text-white w-24  mt-3  h-10 rounded-lg"
            >
              Follow
            </button>
          )}

          <hr className="-ml-7 mt-9 " />
        </div>
        <p className="mt-5 font-bold capitalize tracking-wide">
          more from medium
        </p>

        <div className="">
          <div>
              <div className="flex justify-between  ">
              <div className="flex flex-col">
                <div className="flex items-center pt-4 pb-2">
                  <img
                    className="rounded-full h-8 "
                    src="https://miro.medium.com/v2/resize:fill:176:176/1*kZ7ApQjqvCYB8_08t4avOA.jpeg"
                    alt=""
                  />
                  <p className="text-sm pl-2">hello moto hifhhnj</p>
                </div>
                <p className="w-52  text-[16px] tracking-wide  font-semibold">
                  Why Experienced Programmers Fail Coding Interviews
                </p>
              </div>
              <div className="flex pr-10">
                <img
                  className="rounded h-14 mt-6"
                  src="https://ik.imagekit.io/7da6fpjdo/coverImg/c2d4f878fc_g8zGpkOSL"
                  alt=""
                />
              </div>
            </div>
            <hr className="mt-4 w-[90%]  " />
            <div className="flex justify-between  ">
              <div className="flex flex-col">
                <div className="flex items-center pt-4 pb-2">
                  <img
                    className="rounded-full h-8 "
                    src="https://miro.medium.com/v2/resize:fill:176:176/1*kZ7ApQjqvCYB8_08t4avOA.jpeg"
                    alt=""
                  />
                  <p className="text-sm pl-2">hello moto hifhhnj</p>
                </div>
                <p className="w-52  text-[16px] tracking-wide  font-semibold">
                  Why Experienced Programmers Fail Coding Interviews
                </p>
              </div>
              <div className="flex pr-10">
                <img
                  className="rounded h-14 mt-6"
                  src="https://ik.imagekit.io/7da6fpjdo/coverImg/c2d4f878fc_g8zGpkOSL"
                  alt=""
                />
              </div>
            </div>
            <hr className="mt-4 w-[90%] " />
            <div className="flex justify-between  ">
              <div className="flex flex-col">
                <div className="flex items-center pt-4 pb-2">
                  <img
                    className="rounded-full h-8 "
                    src="https://miro.medium.com/v2/resize:fill:176:176/1*kZ7ApQjqvCYB8_08t4avOA.jpeg"
                    alt=""
                  />
                  <p className="text-sm pl-2">hello moto hifhhnj</p>
                </div>
                <p className="w-52  text-[16px] tracking-wide  font-semibold">
                  Why Experienced Programmers Fail Coding Interviews
                </p>
              </div>
              <div className="flex pr-10">
                <img
                  className="rounded h-14 mt-6"
                  src="https://ik.imagekit.io/7da6fpjdo/coverImg/c2d4f878fc_g8zGpkOSL"
                  alt=""
                />
              </div>
            </div>
            <hr className="mt-4 w-[90%]  mb-10" />

            <hr className="mt-4 w-[90%]  mb-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSideBar;
