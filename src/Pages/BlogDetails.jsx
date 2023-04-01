import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../Components/Loader";

export default function BlogDetails() {
  const { postid } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPostById() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://blog-backend-amwb.onrender.com/v1/post/${postid}`
        );
        setBlog({
          photo: data.data.photo,
          title: data.data.title,
          description: data.data.description,
          username: data.data.user.username,
          gender: data.data.user.gender,
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Something went wrong, please try again later");
      }
    }
    fetchPostById();
  }, []);

  return (
    <div
      className="hero min-h-screen bg-base-200 p-2 sm:p-12 lg:p-4 md:p-4"
      style={{ display: "inherit" }}
    >
      {!loading ? (
        <Loader w={"14"} color={"fill-[#570df8]"} />
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
                  {blog.gender === "male" ? (
                    <img src={"https://i.ibb.co/tLP36v7/male.webp"} />
                  ) : (
                    <img src={"https://i.ibb.co/TKPT0DJ/female.png"} />
                  )}
                </div>
              </div>
              <h4 className="card-user-name text-base font-semibold px-3 capitalize">
                {" "}
                {blog.username}{" "}
              </h4>
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
