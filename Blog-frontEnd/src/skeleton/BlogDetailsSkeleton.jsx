import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogDetailsSkeleton = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#e3e0dc" highlightColor="#cacaca">
        <div className="flex items-center gap-3">
          <Skeleton className="h-[24rem] w-[53rem]" />
        </div>
        <div className=" mt-4 flex flex-col px-16">
          <div className=" flex items-center gap-2">
            <Skeleton className="h-[3rem] w-[3rem] rounded-full" />
            <div className=" flex flex-col">
              <Skeleton className="h-[1.5rem] w-24 " />
              <Skeleton className="h-[1rem] w-32 " />
            </div>
          </div>
          <Skeleton className="h-10 w-[30rem] mt-2" />
          <Skeleton className="h-6 w-[20rem] mt-2" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default BlogDetailsSkeleton;
