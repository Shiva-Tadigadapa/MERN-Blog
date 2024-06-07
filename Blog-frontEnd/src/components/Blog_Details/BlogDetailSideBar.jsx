import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { GetStates } from "use-context-provider";
import SideBarSkeleton from "../../skeleton/SideBarSkeleton";

const BlogDetailSideBar = (props) => {
  const blogDetails = props.blogDetails;
  const { state } = GetStates();
  const userDetail = useSelector(selectUser);

  const [followBtn, setFollowBtn] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const getFollowing = async () => {
      if (userDetail && blogDetails.authorName) {
        try {
          const response = await axios.get(
            `https://backbone-l7ed.onrender.com/api/getFollowing/${blogDetails.authorName}/${userDetail._id}/getfollow`
          );
          setFollowers(response.data.followersCount);
          setFollowBtn(response.data.isFollowing);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    getFollowing();
  }, [blogDetails.authorName, userDetail]);

  const followRequest = async () => {
    setFollowLoading(true);
    try {
      const response = await axios.post(
        `https://backbone-l7ed.onrender.com/api/followRequest/${blogDetails.authorName}/${userDetail._id}`
      );
      setFollowers(response.data.followersCount);
      setFollowBtn(true);
    } catch (error) {
      console.log(error);
    } finally {
      setFollowLoading(false);
    }
  };

  const unfollowRequest = async () => {
    setFollowLoading(true);
    try {
      const response = await axios.post(
        `https://backbone-l7ed.onrender.com/api/unfollowRequest/${blogDetails.authorName}/${userDetail._id}`
      );
      setFollowers(response.data.followersCount);
      setFollowBtn(false);
    } catch (error) {
      console.log(error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (!userDetail || loading) {
    return (
      <div className="  sticky top-[20px]">
        <SideBarSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border  overflow-hidden">
      <div className="lg:w-[23rem] w-[100%] sticky top-[20px]">
        <div className="relative">
          <div className="w-full bg-black top-0 overflow-hidden h-10 absolute -z-[1]"></div>
          <div className="flex flex-col pt-6 px-4 justify-start z-[10]">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <h1 className="text-2xl font-bold pt-5">
                {blogDetails.authorName}
              </h1>
            </div>

            <div className="flex items-center gap-5">
              {followBtn ? (
                <button
                  onClick={unfollowRequest}
                  className="bg-slate-600 text-white w-32 mt-3 h-10 rounded-lg"
                  disabled={followLoading}
                >
                  {followLoading ? "Unfollowing..." : "Unfollow"}
                </button>
              ) : (
                <button
                  onClick={followRequest}
                  className="bg-slate-600 text-white w-32 mt-3 h-10 rounded-lg"
                  disabled={followLoading}
                >
                  {followLoading ? "Following..." : "Follow"}
                </button>
              )}
              <p className="text-xl mt-4 font-mono text-gray-500">
                {followers} followers
              </p>
            </div>

            <p className="mt-4">Hey 👋,Welcome to my blog.</p>
            <div className="mt-5 mb-5 text-gray-500">
              <p className="text-xs font-semibold">JOINED</p>
              <p className="text-sm">Oct 25, 2020</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSideBar;
