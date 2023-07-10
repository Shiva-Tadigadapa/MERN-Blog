import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import {useParams} from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'
import './../../../src/index.css'
import {CiCircleRemove} from 'react-icons/ci'

const Myblogs = () => {
   const [setUser,setBlogDetails] = useState([]);
    const {u_id} = useParams();
    // console.log(u_id)

    useEffect(() => {
        const getBlogsofUser = async () => {
            const res = await axios.get(`https://mern-blog-9lrx.vercel.app/blog/getblogsofuser/${u_id}`).then((response)=>{
              // console.log(response.data[0]._id)
                setBlogDetails(response.data)

        }).catch((error)=>{
            console.log(error)
        })
        }
        getBlogsofUser();
    }, [])

    function removeBlog(id){
      
      console.log("vdfovjlkefklvjef",id)
    }

  return (
    <>
    <div className=' bg-black/90 flex flex-wrap'>

    {
      setUser && setUser.map((blog) => (

        <div className="block-on-hover hover:opacity-50 transition-all z-[1] w-full sm:w-1/3  bg-slate-300 border-slate-950 border-[6px] h-[280px] m-10  rounded-2xl overflow-hidden  max-w-xs mx-auto px-2 sm:px-6 lg:px-2">
        <div className='relative inline-block '>
    <img className=' object-cover rounded-md mt-4  shadow-xl'  src="https://images.unsplash.com/photo-1679180130672-bf7d40f826e3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDM1OTc4MQ&ixlib=rb-4.0.3&q=80&w=800"/>
      <Link to={`/editBlog/${blog._id}`}>

      <FiEdit className='absolute top-20 right-[54%]  hover:cursor-pointer    justify-center hover:text-blue-500   items-center text-center z-[3] text-gray-500 text-4xl'/>  
      </Link>
      

      <CiCircleRemove  className='absolute top-20 right-[25%]  hover:cursor-pointer      justify-center hover:text-blue-500   items-center text-center z-[3] text-gray-500  text-4xl'/>
      
        </div>
      <h1 className="text-xl font-bold leading-tight text-gray-900 mb-4">{blog.title} </h1>
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-700">{blog.authorName}</p>
        <p className="text-gray-500">{ blog.createdAt && blog.createdAt.slice(0,10)}</p>
      </div>    

    </div>
    
  ))
  
}
    
    
        </div>
    </>
  )
}

export default Myblogs