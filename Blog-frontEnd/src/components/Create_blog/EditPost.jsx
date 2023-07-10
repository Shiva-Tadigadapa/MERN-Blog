import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {selectUser} from '../../redux/userSlice'
const EditPost = () => {

  const user = useSelector(selectUser)
  console.log(user)
  const {Blog_id} = useParams()
  console.log(Blog_id)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [blogDetails,setBlogDetails] = useState([])
  const [userId,setUserId] = useState([])
  const [authorName,setAuthorName] = useState([])
  const [authorId,setAuthorId] = useState([])
  const [createdAt,setCreatedAt] = useState([])

  useEffect(() => {
    const getBlog = async () => {
        const res = await axios.get(`https://backbone-l7ed.onrender.com/blog/getblog/${Blog_id}`).then((response)=>{
            console.log(response.data)
            setBlogDetails(response.data)
            setTitle(response.data.title)
            setContent(response.data.content)
            setUserId(response.data.authorU)
            setAuthorName(response.data.authorName)
            // setAuthorId(response.data.author_id)
            setCreatedAt(response.data.createdAt)
        }).catch((error)=>{
            console.log(error)
        })
    }
    getBlog();
}, [Blog_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userId)
    const Blog_details = {
      title:title,
      content:content,
      authorMail:user.email,
      orginalName:user.name,
      authorU:userId,
      authorName:authorName,
      createdAt:createdAt,
    } 
    console.log(Blog_details);
      try{
       const res= await axios.put(`https://backbone-l7ed.onrender.com/blog/update/${Blog_id}`,Blog_details)
        console.log(res);
        
      }catch(err){
        console.log(err);
      }
  }



  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  
  
  
  function handleKeyDown(event) {
    if (event.key === '/') {
      // setShowPopup(true);
      handleClick(event);
      
    }
  }

  return (
   <>
        
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-4">Create Blog Post</h1>
      <form className="w-3/4 max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
            Content
          </label>
          <ReactQuill value={content} onKeyDown={handleKeyDown} onChange={setContent} />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div>
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          <ol>
            <li>
              <Button>
                edit
                </Button>
            </li>
            <li>
              <Button>change color</Button>
            </li>
            <li>
              <Button>bold</Button>
            </li>
            <li>
              <Button>add image</Button>
            </li>
            <li>
              <Button>write with ai</Button>
            </li>
          </ol>{" "}
        </div>
      </Popover>
   </>
  )
}

export default EditPost