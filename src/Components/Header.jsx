import { Link } from "react-router-dom";
import ModalUploadImg from "./ModalUploadImg";

export default function Header({ handleUploadImgUser }) {

  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userPhoto");
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content sticky top-0 z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-neutral rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
          <Link to="/">
            <img
              src="https://i.ibb.co/VC33YkR/logo.png"
              className="w-36 object-cover pl-4"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>

        {localStorage.getItem("userToken") ? (
          <div className="navbar-end pr-4">
            <label htmlFor="my-modal">
              <div className="avatar flex items-center">
                <div className="w-11 rounded-full cursor-pointer">
                  <img
                    src={`${
                      !localStorage.getItem("userPhoto")
                        ? "https://i.ibb.co/LQn4pHG/profile.png"
                        : localStorage.getItem("userPhoto")
                    }`}
                  />
                </div>
              </div>
            </label>
            <ModalUploadImg handleUploadImgUser={handleUploadImgUser} />
            <button className="pl-2 flex items-center" onClick={handleLogOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-end">
            <Link className="btn capitalize" to="/register">
              Register
            </Link>
            <Link className="btn capitalize" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
