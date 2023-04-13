import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AddButton from "../Components/AddButton";
import BlogCard from "../Components/BlogCard";
import Loader from "../Components/Loader";
import SearchIcon from "../assets/Icons/SearchIcon";

const pageSize = 8;

export default function Home({ posts, setPosts, handleDeletePost }) {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  let noOfPages = 1;

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(
          "https://blog-backend-amwb.onrender.com/v1/post"
        );
        console.log(data.data);
        setPosts(data?.data?.reverse());
        setLoading(false);
      } catch (error) {
        setLoading(true);
        // setError(error);
        console.log(error);
        if (error.message === "Network Error")
          toast.error("No Internet, Please check your connectivity");
      }
    }
    getPosts();
  }, []);

  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  // Search
  let itemsToRender =
    search === ""
      ? posts
      : posts.filter((post) => {
          return post.title.toLowerCase().includes(search);
        });

  // Pagination
  noOfPages = Math.ceil(itemsToRender.length / pageSize);

  const pages = Array(noOfPages)
    .fill(0)
    .map((item, i) => i + 1);

  const start = currentPage * pageSize - pageSize;
  const end = start + pageSize;
  itemsToRender = itemsToRender.slice(start, end);

  return (
    <>
      <div className="relative bg-base-200 min-h-screen flex flex-col">
        <div
          className="hero min-h-[25rem]"
          style={{
            backgroundImage: `url("https://i.ibb.co/G5k30Nv/background.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "50% 40%",
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
              <div className="relative form-control">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search Movie"
                  className="input input-bordered w-full text-black rounded-3xl pl-11"
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <AddButton />

        <div className="container mx-auto px-4 flex justify-center items-center py-10 mb-auto flex-col">
          {!loading && posts.length === 0 && <p>No Blogs Yet</p>}
          {!posts.length && loading ? (
            <Loader
              w={"w-[3.2rem]"}
              h={"h-[3.2rem]"}
              color={"fill-[#570df8]"}
            />
          ) : (
            <>
              {itemsToRender.length !== 0 && (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-4">
                  {itemsToRender.map((post) => (
                    <BlogCard
                      key={post._id}
                      post={post}
                      handleDeletePost={handleDeletePost}
                    />
                  ))}
                </div>
              )}

              {search && itemsToRender.length === 0 && (
                <div className="text-center">
                  <div className="w-80">
                    <img
                      src="/src/assets/images/noResults.png"
                      className="w-full"
                    />
                  </div>
                  <span className="text-2xl font-extrabold text-gray-700">
                    No results found
                  </span>
                  <p className="text-lg font-medium pt-2 text-gray-600">
                    We couldn't find what you're looking for
                  </p>
                </div>
              )}

              {pages.length >= 1 && (
                <div className="btn-group mt-12">
                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => changeCurrentPage(page)}
                      className={`btn ${
                        currentPage === page ? "btn-active" : ""
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
