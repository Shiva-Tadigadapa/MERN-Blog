import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineExplore } from 'react-icons/md'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Image, Shimmer } from 'react-shimmer'

const ExploreHome = ( props) => {
  let blogDetails1 = props.blogDetails;
    // console.log(blogDetails1)
  const [blogDetails, setBlogDetails] = useState([]);
  useEffect(() => {
    setBlogDetails(blogDetails1)
    // console.log(blogDetails)
    
  }, [blogDetails1]);

    async function handelLike(_id) {
      
      const res = await axios.post(`https://mern-blog-9lrx.vercel.app/blog/like/${_id}`);
     
      await axios
        .get("https://mern-blog-9lrx.vercel.app/blog/getallblog/like")
        .then((response) => {
          
  
          setBlogDetails(response.data.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  return (
    (blogDetails &&
      blogDetails.map((item) => (
    <div className="pl-5 pr-5 ">
    <div className="flex pt-5 ">
      <div className="   ">
      <img className="w-[50px]   rounded-full" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1679571103557/ZBf6AnvIE.png?w=400&h=400&fit=crop&crop=faces&auto=compress,format&format=webp"/>
      </div>
      <div className="ml-[12px]">
      <Link to={`/author/${item.authorName}`} >
      <p className=" text-md tracking-[0.7px] font-bold">{item.orginalName}</p>
      </Link>
      <div className="flex  text-md text-gray-600">
        <p>{item.authorMail}</p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p>Mar 31,2023</p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p>views :{item.views}</p>
      </div>
      </div>
    </div>
   <div className="pt-4 pb-5">
    <div className="flex justify-between">
      <div>
              <Link to={`/${item.authorName}/${item._id}`} >
      <p className="hover:text-black/70 text-2xl font-[500]">{item.title}</p>
        </Link>
      <p className="pt-1 text-gray-400 font-medium ">5 min read</p>
      <p className="pt-1 text-gray-600    w-[450px] overflow-hidden   leading-[1.325] text-[16.5px]  "  dangerouslySetInnerHTML={{ __html: item.content && item.content.slice(0,200) }} />
      </div>
      <Link to={`/${item.authorName}/${item._id}`} >

      <img className="  mr-0 w-64 h-36 border-gray-300 border-[1px] rounded-md" src={item.image}/>
      </Link>
    </div>
    <div className="flex pt-4  justify-between ">
      <div className="flex  whitespace-nowrap text-ellipsis w-40" >
        {
          item.tags && item.tags.slice(0,3  ).map((item) => (
              <Link to={`/search/${item}`} >
            <div className="mr-3 hover:bg-blue-200 flex justify-center border-[1px] border-gray-300 text-gray-600 rounded-md pt-0.5 pl-2.5 pr-2.5 pb-0.5">
         <p className="w-[100%]  overflow-hidden whitespace-nowrap text-ellipsis">{item}</p>
        </div>
        </Link>
          ))  
        }
        {/* <div className="mr-3  flex justify-center border-[1px] border-gray-300 text-gray-600 rounded-md pt-0.5 pl-2.5 pr-2.5 pb-0.5">
         <p className="w-[100%]  overflow-hidden whitespace-nowrap text-ellipsis">FrontEnd Development</p>
        </div>
        <div className="border-[1px]  flex justify-center border-gray-300 text-gray-600 rounded-md pt-0.5 pl-2.5 pr-2.5 pb-0.5">
        <p className="w-[110px]  overflow-hidden whitespace-nowrap text-ellipsis">FrontEnd Development</p>
        </div> */}
      </div>
      <div className="">
        <div className=" flex">
        <div className="flex items-center justify-start text-gray-500" >
          <img className="mr-1.5 w-[20px] h-[20px]" src="\src\assets\heart.png"  
          onClick={() => {
            handelLike(item._id);
          }}
          
          />

        <p  className="pr-5">{item.likes}</p>

        <img className="mr-1.5 w-[20px] h-[20px]" src="\src\assets\message.png"/>
        <p className="pr-5">45</p>
        </div>
        <div className="flex">
      <img className="w-[30px]   rounded-full" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1679910444433/9ca5067a-4069-4305-97e3-631152e6715c.jpeg?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp"/>
      <img className="w-[30px]   rounded-full" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1679910444433/9ca5067a-4069-4305-97e3-631152e6715c.jpeg?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp"/>
      <img className="w-[30px]   rounded-full" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1679910444433/9ca5067a-4069-4305-97e3-631152e6715c.jpeg?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp"/>
        </div>
        </div>
      </div>
    </div>
    </div> 
</div>
)))
  )
}

export default ExploreHome