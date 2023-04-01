export default function DeleteButton({ onClick, id, title }) {
  return (
    <>
      {/*---- Delete Button ----*/}
      <label
        className="text-white bg-[#000000b3] hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800 absolute right-2 top-12 cursor-pointer"
        htmlFor={id}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {/*---- Modal Confirm Delete ----*/}
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label
          className="modal-box relative flex flex-col justify-center items-center"
          htmlFor={id}
        >
          <img
            src="https://i.ibb.co/VNMjXmR/bin.png"
            alt="bin"
            className="w-20 pb-3"
          />
          <h3 className="text-lg font-bold">
            Delete the{" "}
            <span className="font-bold text-[#570df8]">"{title}"</span> blog?
          </h3>
          <p className="pt-4 pb-5">You will not be able to recover it</p>
          <div className="flex flex-row justify-center items-center gap-2">
            <label
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 cursor-pointer"
              htmlFor={id}
            >
              No, cancel
            </label>
            <label
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 cursor-pointer"
              onClick={onClick}
              htmlFor={id}
            >
              Yes, I'm sure
            </label>
          </div>
        </label>
      </label>
    </>
  );
}
