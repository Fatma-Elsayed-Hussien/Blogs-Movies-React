import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AddButton from "../Components/AddButton";
import BlogCard from "../Components/BlogCard";
import Loader from "../Components/Loader";

export default function Home({ posts, setPosts, handleDeletePost }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://blog-backend-amwb.onrender.com/v1/post"
        );
        console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
        if (error.message === "Network Error")
          toast.error("No Internet, Please check your connectivity");
      }
    }
    getPosts();
  }, []);

  return (
    <>
      <div className="relative bg-base-200 min-h-screen flex flex-col">
        <div
          className="hero min-h-[32rem]"
          style={{
            backgroundImage: `url("https://i.ibb.co/G5k30Nv/background.jpg")`,
          }}
        >
          <div className="hero-overlay bg-opacity-50"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl font-bold">Movies Blogs</h1>
              <p className="mb-5 text-xl">
                Below is a list of some of best movies blogs that everyone
                should watch at least once
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        <AddButton />

        <div className="container mx-auto px-4 flex justify-center items-center py-10 mb-auto">
          {!loading ? (
            <Loader w={"14"} color={"fill-[#570df8]"} />
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-4">
              {posts.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  handleDeletePost={handleDeletePost}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
