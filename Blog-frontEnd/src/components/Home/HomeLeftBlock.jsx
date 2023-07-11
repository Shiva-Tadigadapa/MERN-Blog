import React from 'react'
import { MdOutlineExplore } from "react-icons/md";
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { tagList } from '../../redux/userSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeLeftBlock = () => {
const [tags,setTags] = useState([])
const dispatch = useDispatch();
const tagsList = useSelector(tagList);

  useEffect(() => {
    const getAllTags = async() => {
      
      const res = await axios.get('https://backbone-l7ed.onrender.com/blog/getAllTags').then((response)=>{
        console.log(response.data)
        const tagsData = response.data;
         console.log(tagsData.action)
        setTags(tagsData)
        // console.log(tags)
      })
      
    }
    getAllTags();
    // console.log(tagsList)
  }, [])
  return (
    <div
          className=" h-[100%]  rounded-lg   shadow-md  text-[#343a40]  bg-[--darkmd-color]  grow-[.2] mr-3 sticky top-[30px] "
          style={{ boxShadow: " 0 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <div className=" text-[18px]    tracking-[.5px] ">
            <div className="hover:bg-slate-500">
              <p className="mt-8 p-1 pl-4  ">
                <MdOutlineExplore className="mr-2.5 inline-block  font-[300] text-[25px]" />
                Explore
              </p>
            </div>
            <div className="mt-[10px] hover:bg-slate-500 flex  items-center">
              <p className="p-1  pl-4  flex text-center items-center ">
                <MdOutlineExplore className="mr-2.5 inline-block  font-[300] text-[25px]" />
                Drafts
              </p>
            </div>
            <div className="mt-[10px] hover:bg-slate-500 flex  items-center">
              <p className="p-1  pl-4  flex text-center items-center">
                <MdOutlineExplore className="mr-2.5 inline-block  font-[300] text-[25px]" />
                Bookmarks
              </p>
            </div>
          
            <div className="mt-[10px] hover:bg-slate-500 flex  items-center">
              <p className="p-1 pl-4 flex text-center items-center ">
                <MdOutlineExplore className="mr-2.5 inline-block  font-[300] text-[25px]" />
                Team Blogs
              </p>
            </div>
            <div className="mt-[10px] mb-5 hover:bg-slate-500 flex  items-center">
              <p className="p-1  pl-4  flex text-center items-center">
                <MdOutlineExplore className="mr-2.5 inline-block  font-[300] text-[25px]" />
                More....
              </p>
            </div>
          </div>
          <hr className="border-[#e2e8f0]  " />

          <div className=" ">
            <p className="pt-4 pl-5 text-lg pb-4">Trending Tags</p>
          {

          Object.entries(tags).map(([key, value])  => (
           <Link to={`/search/${key}`} >
               <div className="pb-0 flex justify-center items-center ">
              <div className="p-3 rounded-lg w-[90%] pt-1 pb-1  justify-between hover:bg-[#f3f8ff]  flex flex-wrap items-center">
                {/* <p>JavaScript</p> */}
                <div className="  rounded-lg pt-1 pb-1">
                  <p className="text-[#6d6f73]  whitespace-nowrap text-ellipsis w-[80px]  overflow-hidden text-[16px]">{key}</p>
                </div>
                
                <div className="flex  bg-[#ddebf8] pt-[2px] pb-[2px] pl-[8px] pr-[10px]    hover:text-[#393e46] hover:bg-[#b3daff]  rounded-lg   ">
                  <p className="text-[#718096]  text-sm">+{ value}</p>
                </div>
              </div>
            </div>
            </Link>
             )) 
        }
          
           
         
            
            
          </div>
        </div>
  )
}

export default HomeLeftBlock