import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetStates } from "use-context-provider";
import BlogDetailsSkeleton from "../../skeleton/BlogDetailsSkeleton";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";


const BlogDetail = (props) => {
  const { AUname, id } = useParams();
  const { state } = GetStates();
  const blogDetails = props.blogDetails;
  const userDetail = useSelector(selectUser);
  const [parsedContent, setParsedContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogDetails && blogDetails.content) {
      try {
        const parsedData = JSON.parse(blogDetails.content);

        // Use reduce to filter out only the first image
        let imageSkipped = false;
        const filteredContent = parsedData.content.reduce((acc, item) => {
          if (item.type === "image" && !imageSkipped) {
            imageSkipped = true;
            return acc;
          }
          return [...acc, item];
        }, []);

        setParsedContent(filteredContent);
        console.log("Parsed JSON:", parsedData.content, filteredContent);
        // setLoading(false);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [blogDetails]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);
  const renderTextContent = (textContent) => {
    if (!textContent) return null;

    return textContent.map((textItem, textIndex) => {
      if (textItem.type === "hardBreak") {
        return <br key={textIndex} />;
      }

      let content = textItem.text;

      if (textItem.marks && textItem.marks.length > 0) {
        textItem.marks.forEach((mark) => {
          switch (mark.type) {
            case "link":
              content = (
                <a
                  key={`${textIndex}-${mark.type}`}
                  href={mark.attrs.href}
                  target={mark.attrs.target}
                  rel={mark.attrs.rel}
                  className={mark.attrs.class}
                >
                  {content}
                </a>
              );
              break;

            case "textStyle":
              content = (
                <span
                  key={`${textIndex}-${mark.type}`}
                  style={{ color: mark.attrs.color }}
                >
                  {content}
                </span>
              );
              break;
            case "code":
              content = (
                <code
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "0.2rem",
                    color: "#333",
                    fontSize: "0.9rem",
                  }}
                  key={`${textIndex}-${mark.type}`}
                >
                  {content}
                </code>
              );
              break;
            default:
              break;
          }
        });
      }
      return <React.Fragment key={textIndex}>{content}</React.Fragment>;
    });
  };
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!userDetail || loading) {
    return <BlogDetailsSkeleton />;
  }

            

  return (
    <>
      <div className="bg-white w-full overflow-hidden   rounded-xl">
        <img
          src={blogDetails.image}
          className="h-[22rem] w-full overflow-hidden object-cover"
          alt="Blog Cover"
        />
        <div className="flex flex-col gap-3 px-16 py-5">
          <div className="flex gap-3 items-center">
            <img
              src="https://picsum.photos/200/300"
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex items-start flex-col">
              <p className="text-xl font-semibold">{state.Name}</p>
              <p className="text-xs text-gray-500">
                posted on {formatDate(blogDetails.date)}
              </p>
            </div>
          </div>
        </div>
        <div className="px-16">
          {parsedContent.map((item, index) => {
            switch (item.type) {
              case "heading":
                switch (item.attrs.level) {
                  case 1:
                    return (
                      <h1 className="font-bold text-4xl lg:text-5xl mb-3" key={index}>
                        {item.content && renderTextContent(item.content)}
                      </h1>
                    );
                  case 2:
                    return (
                      <h2 className="font-semibold text-3xl my-3" key={index}>
                        {item.content && renderTextContent(item.content)}
                      </h2>
                    );
                  case 3:
                    return (
                      <h3 className="font-semibold text-2xl my-3" key={index}>
                        {item.content && renderTextContent(item.content)}
                      </h3>
                    );
                  default:
                    return (
                      <h4 className="font-semibold text-xl my-3" key={index}>
                        {item.content && renderTextContent(item.content)}
                      </h4>
                    );
                }
              case "paragraph":
                return (
                  <p className="mt-8 text-lg mb-1.5 " key={index}>
                    {item.content && renderTextContent(item.content)}
                  </p>
                );
              case "taskList":
                return (
                  <ul
                    key={index}
                    style={{ listStyleType: "none", paddingLeft: "1.5rem" }}
                  >
                    {item.content.map((taskItem, taskItemIndex) => (
                      <li
                        key={taskItemIndex}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <input
                          type="checkbox"
                          checked={taskItem.attrs.checked}
                          readOnly
                        />
                        <span style={{ marginLeft: "0.5rem" }}>
                          {taskItem.content &&
                            taskItem.content[0] &&
                            renderTextContent(taskItem.content[0].content)}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              case "bulletList":
                return (
                  <ul
                    key={index}
                    style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}
                  >
                    {item.content.map((listItem, listItemIndex) => (
                      <li key={listItemIndex}>
                        {listItem.content &&
                          listItem.content[0] &&
                          renderTextContent(listItem.content[0].content)}
                      </li>
                    ))}
                  </ul>
                );
              case "orderedList":
                return (
                  <ol
                    key={index}
                    style={{ listStyleType: "decimal", paddingLeft: "1.5rem" }}
                    start={item.attrs.start || 1}
                  >
                    {item.content.map((listItem, listItemIndex) => (
                      <li
                        key={listItemIndex}
                        className="py-1 px-1 tracking-medium text-lg"
                      >
                        {listItem.content &&
                          listItem.content[0] &&
                          renderTextContent(listItem.content[0].content)}
                      </li>
                    ))}
                  </ol>
                );
              case "blockquote":
                return (
                  <blockquote
                    key={index}
                    className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500"
                  >
                    <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-gray-900">
                      {item.content &&
                        item.content[0] &&
                        renderTextContent(item.content[0].content)}
                    </p>
                  </blockquote>
                );
              case "codeBlock":
                return (
                  <div className="relative max-w-2xl mx-auto mt-24" key={index}>
                    <div className="bg-gray-900 text-white p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Code:</span>
                        <button
                          className="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md"
                          data-clipboard-target="#code"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <pre id="code" className="text-gray-300">
                          <code>
                            {item.content &&
                              item.content[0] &&
                              item.content[0].text}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                );
              case "image":
                return (
                  <img
                    key={index}
                    src={item.attrs.src}
                    alt={item.attrs.alt || "Image"}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
