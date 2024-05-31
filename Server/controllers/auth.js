import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../error.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"




export const signup = async (req,res,next)=>{
    console.log(req.body)
     try{
        const {name,email,password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);
        
        const newUser = new User({
            name,
            email,
            password:hash
        })
        await newUser.save();
        console.log(newUser)
      //   res.status(200).json({message:"new user has been created"})
      res.status(200).json(newUser)
     }catch(err){
        next(createError(err.message,500))
     }
}

export const signin = async (req,res,next)=>{
    console.log(req.body)
     try{
        // const {name,email,password} = req.body;
        const user =await User.findOne({name:req.body.name})
        if(!user)return next(createError("User not found",404))
        const isCorrect =await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) return next(createError("Password is incorrect",400))
        
        const token =jwt.sign({id:user._id}, process.env.JWT)
         // console.log(token)
         // localStorage.setItem("token",token).status(200).json(token) 
        // if(!token){
         //    return next(createError("Token not found",400))
         // } 
            
         // else{
         //    localStorage.setItem("token",token) 
         // }
        const {password,...others} = user._doc;

      //   res.cookie("access_token",token,{
      //    httpOnly:true,
      //        sameSite:"none",
      //        secure:true
      //   })
       

      // //   //set the token in the local storage of the browser
      //   .status(200)
      //   .json(token);
      res.json(token)

     }catch(err){
        next(createError(err.message,500))
     }
}

export const profile = async (req,res,next)=>{   
   // req.json(req.headers.authorization.split(" ")[1]);
   // const decoded = jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT)
   try{

      const token =await req.headers.authorization.split(" ")[1];
      // console.log(token)
      // console.log(token)
      jwt.verify(token,process.env.JWT,(err,user)=>{
         if(err) return next(createError("Token is not valid",400))
         
            
      })
      const decodedToken = jwt.decode(token,process.env.JWT);
      const user = await User.findById(decodedToken.id)
      // console.log(user)
      res.json(user)
   }catch(err){
      next(createError(err.message,500))
   }

      // console.log(req.cookies)

}

export const CheckRe = async (req,res,next)=>{
   try{
      const token =req.headers.authorization.split(" ")[1];
      // console.log(token)
      if(!token) return next(createError("Token not found",400))
      jwt.verify(token,process.env.JWT,(err,user)=>{
         if(err) return next(createError("Token is not valid",400))
         // console.log(user)
      })
      const decodedToken = jwt.decode(token,process.env.JWT);
      const user = await User.findById(decodedToken.id)
      console.log(user)
      res.json(user)

   }
   catch(err){
      next(createError(err.message,500))
   }
}

export const googleAuth = async (req,res,next)=>{
   console.log(req.body)
  res.json(req.body)
}


export const followRequest = async (req, res, next) => {
   const { followId, followerId } = req.params;
 
   // Check if followerId is a valid ObjectId
   if (!mongoose.Types.ObjectId.isValid(followerId)) {
     return next(createError('Invalid follower ID', 400));
   }
 
   try {
     // Find user to be followed by username
     const user = await User.findOne({ name: followId });
     const currentUser = await User.findById(followerId);
 
     if (!user || !currentUser) {
       return next(createError('User not found', 404));
     }
 
     const isFollowed = user.followers.includes(followerId);
     const isFollowing = currentUser.following.includes(user._id);
 
     if (isFollowed && isFollowing) {
       user.followers.pull(followerId);
       currentUser.following.pull(user._id);
     } else {
       user.followers.push(followerId);
       currentUser.following.push(user._id);
     }
 
     await user.save();
     await currentUser.save();
     const followerCount = user.followers.length;
     res.json(followerCount);
   } catch (err) {
     next(createError(err.message, 500));
   }
 };

export const getFollowing =async(req,res,next)=>{

   console.log(req.params.UserId,req.params.authorId)
   try{
      const user = await User.findById(req.params.UserId);
      const authorUser = await User.findById(req.params.authorId);
      const isFollowed = authorUser.followers.includes(req.params.UserId);
      // const isFollowing = authorUser.following.includes(req.params.UserId);
      console.log(isFollowed)
      // const following = await User.find({_id:user.following})
      // console.log(req.params.userId)
      // res.json(isFollowed)
//send the user and the author user as the response
      res.json({authorUser,isFollowed})
   }
   catch(err){
      next(createError(err.message,500))  
   }

}