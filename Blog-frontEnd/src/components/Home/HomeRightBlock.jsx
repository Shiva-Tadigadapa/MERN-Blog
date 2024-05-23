import React from "react";
import Sticky from "react-stickynode";

const articles = [
  {
    title: "Building a REST-API with Node.js and Express.js Step",
    author: "ByteScrum Techo",
    reads: 61,
    likes: 91,
  },
  {
    title: "Understanding JavaScript Closures",
    author: "Code Academy",
    reads: 150,
    likes: 200, 
  },
  {
    title: "A Guide to CSS Flexbox",
    author: "Frontend Master",
    reads: 120,
    likes: 180,
  },
  {
    title: "Introduction to React Hooks",
    author: "React Official",
    reads: 200,
    likes: 250,
  },
];

const HomeRightBlock = () => {
  return (
    <>
      {/* <Sticky> */}
      <div className="px-4 py-4">
        <h1 className="text-[#09183ffa] p-1 font-bold text-xl">Trending Articles</h1>
        {articles.map((article, index) => (
          <div key={index} className="mt-2 p-1 flex flex-col  gap-0.5">
            <h1 className="text-[#09183ffa] truncated-content w-[100%] text-md">
              {article.title}
            </h1>
            <div className="text-gray-500 flex text-sm items-center gap-2">
              <p>{article.author}</p>
              <div className="h-1 w-1 rounded-full bg-gray-400"></div>
              <p>{article.reads} Reads</p>
              <div className="h-1 w-1 rounded-full bg-gray-400"></div>
              <p>{article.likes} Likes</p>
            </div>
          </div>
        ))}
      </div>
      {/* </Sticky> */}
    </>
  );
};

export default HomeRightBlock;
