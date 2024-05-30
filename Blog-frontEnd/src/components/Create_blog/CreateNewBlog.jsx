import { useEffect, useState } from "react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import ImageKit from "imagekit";
import { uid } from "uid";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
import { Editor } from "novel-lightweight";
import { GetStates } from "use-context-provider";

const CreateNewBlog = () => {
  const { state } = GetStates();
  const imgID = uid(10);
  const imagekit = new ImageKit({
    publicKey: "public_u7kxH7LgunPNp3hdLZv7edHsbBI=",
    privateKey: "private_8CshqjFmGQTjPw/kXsyOixM5ctM=",
    urlEndpoint: "https://ik.imagekit.io/7da6fpjdo/coverImg",
    authenticationEndpoint: "https://backbone-l7ed.onrender.com/blog/auth",
  });
  const [coverUrl, setCoverUrl] = useState("");
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async () => {
    const localitem = localStorage.getItem("novel__content");
    if (!localitem) {
      console.log("No changes made.");
      return;
    }

    if (localitem === JSON.stringify(initialData)) {
      console.log("No changes made.");
      return;
    }

    let localitemParsed = JSON.parse(localitem);
    let contentParagraph = "";
    let imageUrl = "";
    if (
      localitemParsed &&
      localitemParsed.content &&
      localitemParsed.content.length > 0
    ) {
      for (let item of localitemParsed.content) {
        if (
          item.type === "image" &&
          item.attrs &&
          item.attrs.src &&
          !imageUrl
        ) {
          imageUrl = item.attrs.src;
        }
        if (
          item.type === "paragraph" &&
          Array.isArray(item.content) &&
          item.content.length > 0 &&
          item.content[0].text &&
          !contentParagraph
        ) {
          contentParagraph = item.content[0].text;
        }
        if (imageUrl && contentParagraph) {
          break;
        }
      }
    }
    const title = localitemParsed.content?.[0]?.content?.[0]?.text || "";
    const Blog_initail_content = {
      title: title,
      para: contentParagraph,
      imageUrl: imageUrl,
      authorId: state.UserName,
      authorName: state.Name,
      authorMail: state.AuthorMail,
    };

    console.log("Blog_initail_content", Blog_initail_content);
    const Blog_details = {
      title: "Blog Title",
      content: localitem,
      image: imageUrl,
      authorId: state.UserName,
      authorName: state.Name,
    };

    try {
      const combinedData = {
        Blog_details,
        Blog_initail_content
      };
      const res = await axios.post(
        "https://backbone-l7ed.onrender.com/blog/upload",
        combinedData
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (file) => {
    const response = await imagekit.upload({
      file: file,
      fileName: imgID,
      folder: "/coverImg/",
    });
    const resUrl = response.url;
    setCoverUrl(resUrl);
    return resUrl;
  };

  const initialData = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  color: "#A8A29E",
                },
              },
            ],
            text: "Blog Heading",
          },
        ],
      },
      {
        type: "image",
        attrs: {
          src:
            coverUrl ||
            "https://ik.imagekit.io/7da6fpjdo/coverImg/842bceb692_GDGs1hUSL",
          alt: null,
          title: null,
          width: null,
          height: null,
        },
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  color: "#A8A29E",
                },
              },
            ],
            text: "Tell Your Story...",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  color: "#A8A29E",
                },
              },
            ],
            text: "Place More Images As Your Needed...",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  color: "#A8A29E",
                },
              },
            ],
            text: "Write Your Code...",
          },
        ],
      },
      {
        type: "codeBlock",
        attrs: {
          language: null,
        },
        content: [
          {
            type: "text",
            text: `#include <iostream>
  using namespace std;
  
  int main(){
    cout << "Hello World" << endl;
    return 0;
  }`,
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [
                  {
                    type: "textStyle",
                    attrs: {
                      color: "#A8A29E",
                    },
                  },
                ],
                text: "Quote something....",
              },
            ],
          },
        ],
      },
    ],
  };

  const [data, setData] = useState(initialData);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-20">
        <Editor
          defaultValue={data}
          disableLocalStorage={false}
          onUpdate={(editor) => {
            setData(editor);
          }}
          handleImageUpload={async (file) => {
            const uploadUrl = await handleImage(file);
            return uploadUrl || "www.example.com/failed-upload.png";
          }}
          className="h-[20rem] w-[50rem]"
        />
      </div>
      <button onClick={handleSubmit}>Save</button>
    </>
  );
};

export default CreateNewBlog;
