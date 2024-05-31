import Blog from '../models/Blog.js'
import User from '../models/User.js'
import initialBlogData from '../models/initialBlogData.js';
import { createError } from '../error.js'
import Fuse from 'fuse.js';
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 60 * 60 });


export const getallInitial = async (req, res, next) => {
    try {
        const initialData = await initialBlogData.find();
        res.json(initialData)
    }
    catch (err) {
        next(createError(err.message, 500))
    }
}


export const uploadBlog = async (req, res, next) => {
    try {
        const { Blog_details, Blog_initail_content } = req.body;
        const { content, authorId, authorName, image, tags } = Blog_details;
        //    console.log(content,authorId,authorName,image,tags)
        const { title, para, imageUrl, authorMail } = Blog_initail_content;
        console.log(title, para, imageUrl, authorMail)
        //   console.log(tags)
        const newBlog = new Blog({
            title: title,
            content: content,
            authorU: authorId,
            authorName: authorName,
            authorMail: authorMail,
            // image:`https://source.unsplash.com/featured/${title}`,
            image: image,
            tags: tags,
        })
        await newBlog.save();
        const initialData = new initialBlogData({
            title: title,
            content: para,
            authorId: authorId,
            authorName: authorName,
            authorMail: authorMail,
            image: imageUrl,
            BlogId: newBlog._id
        })

        await initialData.save();
        // console.log(newBlog, initialData)
        res.json(initialData)
        // const {title,content,
        // } = req.body;

        //    res.json(reqD)
    }
    catch (err) {
        next(createError(err.message, 500))
    }
}


export const getAllBlogs = async (req, res, next) => {

    try {
        // const cacheKey = 'allBlogs'; // cache key
        // let allBlogs = cache.get(cacheKey);   
        // if (!allBlogs) {
        const blogs = await Blog.find();
        // cache.set(cacheKey, blogs);
        // }
        res.json(blogs)
    }
    catch (err) {
        next(createError(err.message, 500))
    }
}

export const getAllBlogsLike = async (req, res, next) => {
    try {
        const blogs = await Blog.find();

        res.json(blogs)
    }
    catch (err) {
        next(createError(err.message, 500))
    }
}

export const getBlogById = async (req, res, next) => {
    try {
        // console.log(req.params.id)
        const blog = await Blog.findById(req.params.id);
        // console.log(blog)
        res.json(blog)

    }
    catch (err) {
        next(createError(err.message, 500))
    }
}


export const getBlogsOfUser = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ authorU: req.params.id })
        res.json(blogs)

    }
    catch (err) {
        next(createError(err.message, 500))
    }
}

export const upDateBlogPost = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.BlogP_id);
        // console.log(first)
        console.log(blog.tags)

        console.log(req.body.authorName, req.body.authorMail, blog.authorU, req.body.authorU, req.body.authorU == blog.authorU, req.params.BlogP_id)
        if (blog.authorU == req.body.authorU) {
            blog.title = req.body.title;
            blog.content = req.body.content;
            blog.authorMail = req.body.authorMail;
            blog.authorName = req.body.authorName;
            blog.orginalName = req.body.orginalName;
            //update the blog

            const updatedBlog = await blog.save();
            res.json(updatedBlog)
        }
        else {
            res.json("You are not the author of this blog")
        }
    }
    catch (err) {
        next(createError(err.message, 500))
    }
}

export const likeBlogPost = async (req, res, next) => {

    try {
        const blog = await Blog.findById(req.params.id);
        blog.likes = blog.likes + 1;
        const updatedBlog = await initialBlogData.findOneAndUpdate({ BlogId: req.params.id }, { likes: blog.likes }, { new: true });
        await blog.save();
        await updatedBlog.save();
        
        res.json(blog.likes)
        // res.json("The blog has been liked")
    }
    catch (err) {
        next(createError(err.message, 500))
    }
}


export const getSerachBlogs = async (req, res, next) => {
    // try{
    //     const blogs = await Blog.find({title:{$regex:req.params.search,$options:"i"}})
    //     res.json(blogs)
    // }
    // catch(err){
    //     next(createError(err.message,500))  
    // }
    try {

        const serText = req.params.search;
        // const blogs = await Blog.find({title:{$regex:serText,$options:"i"}})
        const options = {
            includeScore: true,
            keys: ['title', 'content', 'authorName', 'category', 'tags'],
            threshold: 0.4,
        };
        const blogs = await Blog.find();
        const fuse = new Fuse(blogs, options);
        const result = fuse.search(serText);
        const res3 = result.map((item) => item.item)
        res.json(res3)
    }
    catch (err) {
        next(createError(err.message, 500))
    }
}

//delete post by id:
export const deleteBlogPost = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.BlogP_id);
        if (blog.authorU == req.params._id) {

            await blog.deleteOne();
            res.json("The blog has been deleted!")
        }
        else {
            res.json("Blog Says You cannot delete this blog")
        }
    } catch (error) {
        next(createError(error.message, 500))
    }
}

export const getAllTags = async (req, res, next) => {
    try {
        const cacheKey = 'tags'; // cache key
        let tags = cache.get(cacheKey);
        //   console.log(tags, "tags in cache")
        if (!tags) {
            // console.log("cache miss")
            const blogs = await Blog.find();
            const tagCount = blogs
                .flatMap((blog) => blog.tags)
                .reduce((acc, tag) => {
                    acc[tag] = (acc[tag] || 0) + 1;
                    return acc;
                }, {});
            const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
            const top10Tags = sortedTags.slice(0, 8).reduce((acc, [tag, count]) => {
                acc[tag] = count;
                return acc;
            }, {});
            tags = top10Tags;
            cache.set(cacheKey, tags); // store result in cache
        }
        res.json(tags);
    } catch (err) {
        next(createError(err.message, 500));
    }
};

// export const getBlogsByCategory = async (req,res,next)=>{
//     try{
//         const blogs = await Blog.find({category:req.params.category});
//         res.json(blogs)
//     }
//     catch(err){
//         next(createError(err.message,500))  
//     }
// }

export const addView = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        blog.views = blog.views + 1;
        const updatedBlog = await initialBlogData.findOneAndUpdate({ BlogId: req.params.id }, { views: blog.views }, { new: true });
        await blog.save();
        await updatedBlog.save();
        res.json(blog.views)
    }
    catch (err) {
        next(createError(err.message, 500))
    }
}


export const getAllTrending = async (req, res, next) => {

    try {
        const cacheKey = 'trending';
        let trending = cache.get(cacheKey);
        // if (!trending) {
        const blogs = await initialBlogData.find();
        const blogs1 = blogs.sort((a, b) => b.views + b.likes - (a.views + a.likes));
        // cache.set(cacheKey, blogs1); // store result in cache
        // }
        res.json(blogs1);
    } catch (err) {
        next(createError(err.message, 500));
    }
}