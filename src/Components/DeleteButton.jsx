import DeleteIcon from "../assets/Icons/DeleteIcon";

export default function DeleteButton({ onClick, id, title }) {
  return (
    <>
      {/*---- Delete Button ----*/}
      <label
        className="text-white bg-[#000000b3] hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800 absolute right-2 top-14 cursor-pointer"
        htmlFor={id}
      >
       <DeleteIcon />
      </label>

      {/*---- Modal Confirm Delete ----*/}
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal">
        <label
          className="modal-box relative flex flex-col justify-center items-center"
          // htmlFor={id}
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
