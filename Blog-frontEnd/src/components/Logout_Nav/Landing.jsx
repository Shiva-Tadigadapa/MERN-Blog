import React from "react";
import Lottie from "lottie-react";
import animationData from "../../lotties/anima.json";
import SIgnUp from "./SIgnUp";

const Landing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
          <div>
        <h1 className="text-5xl pl-52 pt-8  font-mono  italic text-sky-900  text-left font-bold">
          Welcome to our{" "}
        </h1>
        <h1 className="text-5xl pl-52 pt-8  font-mono italic text-left text-sky-900 font-bold">
          Blog Community
        </h1>
        <div className=" absolute  left-48  top-42">
          <Lottie
            className=""
            options={defaultOptions}
            height={400}
            width={400}
          />
        </div>
      </div>
      {/* <SIgnUp/> */}
    </>
  );
};

export default Landing;
