import mongoose from "mongoose";

const initialBlogDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    authorMail: {
        type: String,
    },
    authorId: {
        type: String,
    },
    authorName: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ""
    },
    tags: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const initialBlogData = mongoose.model("initialBlogData", initialBlogDataSchema);

export default initialBlogData;