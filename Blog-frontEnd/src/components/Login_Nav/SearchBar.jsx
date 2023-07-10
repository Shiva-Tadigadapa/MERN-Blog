import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searcVal, setSearcVal] = useState("");

  const getSerchResult = (txt) => {
    console.log(txt);
    axios.get(`https://backbone-l7ed.onrender.com/blog/search/${txt}`).then((res) => {
      console.log(res.data);
      setSearchTerm(res.data);
    });
  };
  //   const navigate = () => {
  //     console.log("navigate");

  //     };
  const getText = (e) => {
    let sertxt = e.target.value;
    // console.log(sertxt)
    getSerchResult(sertxt);
    setSearcVal(sertxt);
  };
  return (
    <>
      <div className="   ">
        <input
          className="rounded-lg  text-white
          background-animate
          bg-gradient-to-r  from-[#cc543393] to-[#23074da2]   focus:shadow-2xl pl-5 h-12 w-[32rem] border-none  
              appearance-none   text-gray-700 leading-tight focus:outline-none focus:bg-[#90c4ff81] bg-[#d3dee9]
              "
          type="text"
          onChange={getText}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/search/${searcVal}`);
              setSearcVal("");
            }
          }}
          placeholder="search"
        />

        {searcVal ? (
          <div className=" absolute z-[3]  flex ">
            {searchTerm.length ? (
              <ul className="bg-blue-200/40 flex flex-col rounded-lg backdrop-blur-sm">
                <>
                  {searchTerm &&
                    searchTerm.slice(0, 3).map((item, index) => {
                      return (
                        <Link to={`/${item.authorName}/${item._id}`}>
                          <li
                            onClick={() => {
                              setSearcVal("");
                            }}
                            key={index}
                            className="mt-3 hover:bg-white"
                          >
                            <div className="   justify-between flex ml-1.5 w-[31rem] h-[6.5rem]">
                              <div className="p-4 flex  flex-col justify-center">
                                <p className="mt-1">{item.title}</p>
                                <div className="flex ml-2  pt-2 items-center">
                                  <p className="mr-2 text-[0.970rem]">
                                    by: <span>{item.orginalName}</span>
                                  </p>
                                  <img
                                    className="h-[30px] rounded-full"
                                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1679910444433/9ca5067a-4069-4305-97e3-631152e6715c.jpeg?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp"
                                    alt="img"
                                  />
                                </div>
                              </div>
                              <img
                                className="h-[100%] mr-4 rounded-md "
                                src={item.image}
                                alt="img"
                              />
                            </div>
                          </li>
                        </Link>
                      );
                    })}
                  {searchTerm && searchTerm.length && (
                    <Link
                      className="text-gray-600 p-1 text-center flex   justify-center items-center"
                      to={`/search/${searcVal}`}
                    >
                      <button
                        className=" text-gray-600 p-1  text-center flex  justify-center items-center"
                        onClick={() => setSearcVal("")}
                      >
                        Read More
                      </button>
                    </Link>
                  )}
                </>
              </ul>
            ) : (
              <ul className="bg-blue-100 flex flex-col">
                <li className="mt-3 hover:bg-white">
                  <div className="   justify-between flex ml-1.5 w-[31rem] h-20">
                    <div className="p-4 flex  flex-col justify-center">
                      <p className="mt-1">No result found</p>
                    </div>
                  </div>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SearchBar;
