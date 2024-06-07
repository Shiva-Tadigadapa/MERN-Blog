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
 
   try {
     // Find user to be followed by username
     const userToFollow = await User.findOne({ name: followId });
     if (!userToFollow) {
       return next(createError(`User with username ${followId} not found`, 404));
     }
 
     // Check if the user is already following
     if (userToFollow.followers.includes(followerId)) {
       return next(createError(`You are already following ${followId}`, 400));
     }
 
     // Update the followers and following lists atomically
     await User.findByIdAndUpdate(userToFollow._id, { $addToSet: { followers: followerId } });
     await User.findByIdAndUpdate(followerId, { $addToSet: { following: userToFollow._id } });
 
     // Retrieve the updated userToFollow document to get the followers count
     const updatedUserToFollow = await User.findById(userToFollow._id);
 
     res.status(200).json({ 
       message: `Successfully followed ${followId}`, 
       followersCount: updatedUserToFollow.followers.length 
     });
   } catch (err) {
     next(createError(err.message, 500));
   }
 };
 
 export const unfollowRequest = async (req, res, next) => {
   const { followId, followerId } = req.params;
 
   try {
     // Find user to be unfollowed by username
     const userToUnfollow = await User.findOne({ name: followId });
     if (!userToUnfollow) {
       return next(createError(`User with username ${followId} not found`, 404));
     }
 
     // Check if the user is not following
     if (!userToUnfollow.followers.includes(followerId)) {
       return next(createError(`You are not following ${followId}`, 400));
     }
 
     // Update the followers and following lists atomically
     await User.findByIdAndUpdate(userToUnfollow._id, { $pull: { followers: followerId } });
     await User.findByIdAndUpdate(followerId, { $pull: { following: userToUnfollow._id } });
 
     // Retrieve the updated userToUnfollow document to get the followers count
     const updatedUserToUnfollow = await User.findById(userToUnfollow._id);
 
     res.status(200).json({ 
       message: `Successfully unfollowed ${followId}`, 
       followersCount: updatedUserToUnfollow.followers.length 
     });
   } catch (err) {
     next(createError(err.message, 500));
   }
 };
 
 
 

 export const getFollowing = async (req, res, next) => {
   const { followId, followerId } = req.params;
 
   try {
     // Find the user to be checked by username
     const userToCheck = await User.findOne({ name: followId });
     if (!userToCheck) {
       return next(createError(`User with username ${followId} not found`, 404));
     }
 
     // Check if the current logged-in user is following the userToCheck
     const isFollowing = userToCheck.followers.includes(followerId);
 
     // Get the follower count
     const followersCount = userToCheck.followers.length;
 
     res.status(200).json({ 
       isFollowing, 
       followersCount 
     });
   } catch (err) {
     next(createError(err.message, 500));
   }
 };
 