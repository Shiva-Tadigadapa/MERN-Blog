// Landing.js
import React from "react";
import SIgnUp from "./SIgnUp";
import Login from "./Login";
import { useMainDashContext } from "../../context/AppContext";

const Landing = () => {
  const { SignUpTrue, setSignUpTrue } = useMainDashContext();

  const handleSignUpClick = () => {
    setSignUpTrue(SignUpTrue ? false : true);
  };

  return (
    <>
      <div>
        <nav className="flex p-10 justify-between">
          <h1 className="font-mono text-3xl">Fork.to</h1>
          <div className="flex items-center justify-center gap-10">
            <h1>Home</h1>
            <h1>Blog</h1>
            <button onClick={handleSignUpClick}>Sign Up</button>
            <button onClick={handleSignUpClick}>Login</button>
          </div>
        </nav>
        <div className="flex p-10 justify-evenly">
          <div className="w-[60%] flex flex-col gap-10">
            <h1 className="text-7xl text-[#4B6587] text-left font-semibold">
              Create a <span className="text-[#AC7D88]">UNIQUE</span>&nbsp; blog
              with Fork.to
            </h1>
            <p className="w-3/4 text-lg">
              Create a blog with us and share your thoughts with the world and
              get a chance to be a part of our community and get a chance to be
              a part
            </p>
            <button className="bg-zinc-500 text-white w-40 h-14 rounded-2xl">
              Get Started
            </button>
          </div>
          <div>{SignUpTrue ? <Login /> : <SIgnUp />}</div>
        </div>
      </div>
    </>
  );
};

export default Landing;
