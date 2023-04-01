import { Link } from "react-router-dom";

export default function EditButton({ post }) {
  return (
    <>
      <Link to={`/post/${post._id}`}>
        <button
          type="button"
          className="text-white bg-[#000000b3] hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800 absolute right-2 top-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
          </svg>
        </button>
      </Link>
    </>
  );
}