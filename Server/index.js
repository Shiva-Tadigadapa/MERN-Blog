// import express  from "express"; 
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import userRoutes from "./routes/users.js";
// import authRoutes from "./routes/auth.js";
// import blogRoutes from "./routes/blog.js";
// // import cookieParser from "cookie-parser"
// import cors from "cors"
// // import cookieParser from "cookie-parser"
// // import cookies from "cookies"    // npm i cookies
// // const cookieParser = require(‘cookie-parser’);
// import cookieParser from "cookie-parser" // npm i cookie-parser
// // import { JsonWebTokenError } from "jsonwebtoken";
// // var cookieParser = require('cookie-parser')
// // import cookies from "cookies" // npm i cookies


// const app = express();
// // app.use(cookieParser())
// app.use(express.json())
// // app.use(cookieParser())
// app.use(cors({
//     origin:"http://127.0.0.1:5173",
//     credentials:true
// }))
// // app.use(cookies());
// // app.use(cookies());
// // app.get("/",async(req,res)=>{
// //     res.send("hello")
// // })

// app.use(cookieParser()); // Note the `()`

// dotenv.config();

// const connect=() => {
//     mongoose.connect(process.env.MONGO).then(()=>{
//         console.log("connected to mongo")
//     }).catch(err=>{
//         console.log(err) 
//     })
// }

// app.use("/api/users",userRoutes)
// app.use("/api/",authRoutes) 
// app.use("/blog/",blogRoutes)

// app.use((err,req,res,next)=>{
//     const status = err.statusCode || 500;
//     const message = err.message || "Something went wrong";
//     return res.status(status).json({
//         success:false,
//         status,
//         message,

//     });
// });

// // app.get("/api/profile",async(req,res)=>{
   
    
    
// // //    const obj = await JSON.parse(JSON.stringify(req.cookies));
// //     // console.log(obj)
// //  res.json(token)
// // })

// app.listen(8000,()=>{
//     connect();
//     console.log("connected to server")
// })     
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

app.use(
  cors({
    origin: ["https://tukasa-blog.netlify.app","https://spectacular-florentine-c71119.netlify.app","https://mern-blog-wine.vercel.app", "https://backbone-l7ed.onrender.com/", "http://localhost:3000"],
    // origin: "http://localhost:3000,
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api", authRoutes);
app.use("/blog", blogRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connect();
  console.log(`Server connected and listening on port ${port}`);
});
