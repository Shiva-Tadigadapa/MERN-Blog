import express from "express";
import {} from "../controllers/blogs.js";
import {getAllBlogsLike, getSerachBlogs,getAllTrending,uploadBlog ,addView, getAllTags,deleteBlogPost ,getAllBlogs,getBlogById,getBlogsOfUser,upDateBlogPost,likeBlogPost,getallInitial} from "../controllers/blogs.js";
const router = express.Router();

router.post("/upload", uploadBlog);

router.get("/getallblog", getAllBlogs);

router.get("/getallInitial", getallInitial);

router.get("/getallblog/like", getAllBlogsLike);

router.get(`/getblog/:id`,getBlogById)

router.get("/getblogsofuser/:id",getBlogsOfUser)

router.put("/update/:BlogP_id", upDateBlogPost)

router.post(`/like/:id`,likeBlogPost)

router.get("/search/:search",getSerachBlogs)

router.delete("/delete/:BlogP_id/:_id",deleteBlogPost)

router.get("/getAllTags",getAllTags)

router.post('/addview/:id/view',addView)

router.get("/trending",getAllTrending)


export default router;