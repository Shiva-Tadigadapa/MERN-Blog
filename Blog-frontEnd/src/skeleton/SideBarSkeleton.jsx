import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SideBarSkeleton = () => {
  return (
    <>
      <div className=" flex-col   flex     items-start px-4   gap-3 justify-center    ">
        <SkeletonTheme baseColor="#e3e0dc" highlightColor="#cacaca">
          <div className=" flex items-end gap-3">
            <Skeleton className=" rounded-full w-[3rem] h-[3rem]  " />
            <Skeleton className=" h-6 w-28" />
          </div>
          <div className=" flex items-center gap-4">
            <Skeleton className=" h-8 w-32" />
            <Skeleton className=" h-6 w-32" />
          </div>
          <Skeleton className=" h-6 w-64" />
          <div>
            <Skeleton className=" h-5 w-14" />
            <Skeleton className=" h-5 w-24" />
          </div>
        </SkeletonTheme>
      </div>
    </>
  );
};

export default SideBarSkeleton;
