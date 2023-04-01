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
      console.log(data);
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
        <figure className="h-72 relative">
          <img
            src={post.photo}
            alt="Movie"
            className="w-full h-full object-cover"
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
        <div className="card-body py-5 px-5">
          <div className="card-user flex items-center justify-start">
            <div className="avatar">
              <div className="w-8 rounded-full">
                {post.user.gender === "male" ? (
                  <img src={"https://i.ibb.co/tLP36v7/male.webp"} />
                ) : (
                  <img src={"https://i.ibb.co/TKPT0DJ/female.png"} />
                )}
              </div>
            </div>
            <h4 className="card-user-name text-base font-semibold px-3 capitalize">
              {post.user.username}
            </h4>
          </div>
          <h2 className="card-title text-lg font-bold capitalize">
            {post.title}
          </h2>
          <p className="break-words">
            {post.description.substring(0, 70)}
            {post.description.length > 70 && (
              <Link to={`/postDetails/${post._id}`} className="text-blue-600">
                {" "}
                Read more...
              </Link>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
