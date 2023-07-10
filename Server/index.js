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
    origin: "https://mern-blog-wine.vercel.app",
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
