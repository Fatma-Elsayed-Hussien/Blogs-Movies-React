import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function BlogCard({ post, handleDeletePost }) {
  const handleDelete = async (post) => {
    try {
      // Call Backend
      const { data } = await axios.delete(
        `https://blog-backend-amwb.onrender.com/v1/post/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      toast.success("Blog Deleted Successfully");
      // Update app state
      handleDeletePost(post);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <>
      <div className="card lg:w-72 md:w-80 bg-base-100 shadow-xl">
        <figure className="h-64 relative">
          <img
            src={post.photo}
            alt="Movie"
            className="w-full h-full object-cover hover:scale-110 ease-in duration-300"
          />
        </figure>
        {post.user._id === localStorage.getItem("userId") &&
        localStorage.getItem("userToken") ? (
          <div>
            <EditButton post={post} />
            <DeleteButton
              onClick={() => handleDelete(post)}
              id={post._id}
              title={post.title}
            />
          </div>
        ) : (
          ""
        )}
        <div className="card-body py-3 px-5">
          <div className="card-user flex items-center justify-start">
            <div className="avatar">
              <div className="w-9 rounded-full">
                {post.user.gender === "male" ? (
                  <img
                    src={`${
                      !post.user.photo
                        ? "https://i.ibb.co/tLP36v7/male.webp"
                        : post.user.photo
                    } `}
                  />
                ) : (
                  <img
                    src={`${
                      !post.user.photo
                        ? "https://i.ibb.co/TKPT0DJ/female.png"
                        : post.user.photo
                    }`}
                  />
                )}
              </div>
            </div>
            <div>
              <h4 className="card-user-name text-base font-semibold px-3 capitalize">
                {post.user.username}
              </h4>
              <p className="text-xs text-gray-600 px-3">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>

          <h2 className="card-title text-lg font-bold capitalize">
            {post.title}
          </h2>
          <p className="break-words">
            {post.description.substring(0, 85)}
            {post.description.length > 85 && "..."}
          </p>
          {post.description.length > 85 && (
            <Link
              to={`/postDetails/${post._id}`}
              className="text-[#570df8] bg-white border-[#570df8] border hover:bg-[#570df8] hover:text-white font-medium rounded-3xl text-sm block items-center px-4 py-[0.5rem] text-center cursor-pointer ease-linear duration-300"
            >
              Read more
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
