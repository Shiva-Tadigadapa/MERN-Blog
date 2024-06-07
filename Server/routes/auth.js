import express from "express";
import { signin, signup,profile, getFollowing,followRequest,unfollowRequest, CheckRe, googleAuth } from "../controllers/auth.js";
import {} from "../controllers/user.js";

const router = express.Router();

router.get("/", CheckRe); 
//create a user
router.post("/signup",signup);


//Login a user
router.post("/signin",signin);

router.get("/profile", profile);
// router.get("/checkAuth",CheckAuth)

//Google Auth
router.post("/followRequest/:followId/:followerId",followRequest)
router.get("/getFollowing/:followId/:followerId/getfollow",getFollowing)

router.post("/unfollowRequest/:followId/:followerId",unfollowRequest)
router.post("/google",googleAuth)
export default router;  