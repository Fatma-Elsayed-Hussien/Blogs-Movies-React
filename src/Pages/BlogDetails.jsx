import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../Components/Loader";

export default function BlogDetails() {
  const { postid } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostById() {
      try {
        const { data } = await axios.get(
          `https://blog-backend-amwb.onrender.com/v1/post/${postid}`
        );
        setBlog({
          photo: data.data.photo,
          title: data.data.title,
          description: data.data.description,
          user: data.data.user,
          createdAt: data.data.createdAt,
        });
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
        toast.error("Something went wrong, please try again later");
      }
    }
    fetchPostById();
  }, []);

  return (
    <div
      className="hero min-h-screen bg-base-200 p-2 sm:p-12 lg:p-4 md:p-4"
      style={{ display: `${loading ? "flex" : "inherit"}` }}
      // style={{ display: "inherit" }}
    >
      {loading ? (
        <div className="m-auto">
          <Loader w={"w-[3.2rem]"} h={"h-[3.2rem]"} color={"fill-[#570df8]"} />
        </div>
      ) : (
        <div className="card w-full shadow-2xl bg-base-100 hero-content flex-col lg:flex-row-reverse md:flex-row-reverse lg:max-w-6xl md:max-w-6xl m-auto items-start">
          <div className="text-center lg:text-left w-full lg:w-2/6 md:w-5/12 lg:h-full sm:display-none">
            <div>
              <img
                src={blog.photo}
                alt="Movie"
                className="w-full h-2/5 lg:h-full md:h2/5 object-cover rounded-2xl p-0"
              />
            </div>
          </div>
          <div className="card-body gap-4 lg:w-1/4 sm:w-full md:w-1/2 w-full lg:p-2 md:p-2 p-2">
            <div className="card-user flex items-center justify-start">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  {blog.user.gender === "male" ? (
                    <img
                      src={`${
                        !blog.user.photo
                          ? "https://i.ibb.co/tLP36v7/male.webp"
                          : blog.user.photo
                      }`}
                    />
                  ) : (
                    <img
                      src={`${
                        !blog.user.photo
                          ? "https://i.ibb.co/TKPT0DJ/female.png"
                          : blog.user.photo
                      }`}
                    />
                  )}
                </div>
              </div>
              <div>
                <h4 className="card-user-name text-lg font-semibold px-3 capitalize">
                  {" "}
                  {blog.user.username}{" "}
                </h4>
                <p className="text-sm text-gray-600 px-3">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            </div>
            <h2 className="card-title text-2xl font-bold capitalize">
              {" "}
              {blog.title}{" "}
            </h2>
            <p className="break-words"> {blog.description} </p>
          </div>
        </div>
      )}
    </div>
  );
}
