import { useState } from 'react';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {selectUser} from '../../redux/userSlice'
import ImageKit from 'imagekit';
import { uid } from 'uid';
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react'
const CreateNewBlog = () => {

  const imgID=uid(10);
  console.log(imgID);
  const imagekit= new ImageKit({
    publicKey:"public_u7kxH7LgunPNp3hdLZv7edHsbBI=",
    privateKey:"private_8CshqjFmGQTjPw/kXsyOixM5ctM=",
    urlEndpoint:"https://ik.imagekit.io/7da6fpjdo/coverImg",
    authenticationEndpoint:"https://mern-blog-9lrx.vercel.app/blog/auth",


  })

   const [coverUrl , setcoverUrl] = useState('');

  const userId =useSelector(selectUser);
  // console.log(userId._id);
  const [text, setText] = useState('');
  
  const handleChange = (value) => {
    setText(value);
  }
  console.log(text );
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
  const [title, setTitle] = useState('');
  const [Category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  
  
  const token = localStorage.getItem('access_token')
  const config ={
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
  // .replace(/<[^>]+>/g, '')
  const handleSubmit =async (event) => {
    event.preventDefault();
    var newStr =await userId.name.split("");
  
    for (var i = 0; i < newStr.length; ++i) {
      if (newStr[i] === " ") {
        newStr[i] = "-";
      }
    }  
    


       
    const Blog_details = {
      title:title,
      content:content,
      tags:tags.split(',').map(item=>item.trim()).filter(item=>item!=='').map(item=>item.toLowerCase()),
      authorMail:userId.email,
      orginalName:userId.name,
      authorId:userId._id,
      authorName:`@${newStr.join('')}`,
      image:coverUrl,
      category:Category,
      tags:tags.split(',').map(item=>item.trim()).filter(item=>item!=='').map(item=>item.toLowerCase()),
    } 
    console.log(Blog_details);
      try{
       const res= await axios.post('https://mern-blog-9lrx.vercel.app/blog/upload',Blog_details)
        console.log(res);
        
      }catch(err){
        console.log(err);
      }

    };


async function handleImage(event) {
  event.preventDefault();
  const file = event.target.files[0];
  // console.log(file)
  const response = await imagekit.upload({
    file: file, //required
    fileName: imgID, //required
    folder: "/coverImg/", //optional
  })
  const resUrl = await response.url;
  setcoverUrl(resUrl);
  console.log(resUrl )

}



  return (
 <>

     
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h2>Add Image:</h2>
            <input type="file"
            accept='image/*'
            name="cover"
           
            onChange={(event) => {
              handleImage(event);
            }}
            />


           <img className='w-10 h-10' src={coverUrl} />
      <h1 className="text-4xl font-bold mb-4">Create Blog Post</h1>
      <form className="w-3/4 max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <div className='flex'>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder='Title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            />
          <input
            className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder='Category'
            value={Category}
            onChange={(event) => setCategory(event.target.value)}
            />
            </div>
            <input
            className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder='tags (seperate by comma)'
            value={ tags}
            onChange={(event) => setTags( event.target.value)}
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
  );
};

export default CreateNewBlog;
