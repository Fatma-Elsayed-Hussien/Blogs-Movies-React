import { Link } from "react-router-dom";

export default function AddButton() {
  return (
    <>
      <Link to={localStorage.getItem("userToken") ? `post/add` : "/login"}>
        <button className="btn btn-circle btn-primary shadow-xl border-none fixed bottom-8 right-8 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </Link>
    </>
  );
}
