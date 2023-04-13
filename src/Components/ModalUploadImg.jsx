import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import UploadIcon from "../assets/Icons/UploadIcon";
import Loader from "./Loader";
import DeleteIcon from "../assets/Icons/DeleteIcon";

const schema = yup.object({
  photo: yup.mixed(),
});

export default function ModalUploadImg({ handleUploadImgUser }) {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem("userPhoto")
  );

  const { handleSubmit, register, getValues, resetField } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      photo: localStorage.getItem("userPhoto"),
    },
  });

  const formSubmit = async (data) => {
    console.log(data);
    const form = new FormData();
    //Check if "photo" is already exist --> not string(URL from backend)
    if (data?.photo[0] && typeof getValues("photo") !== "string") {
      form.append("photo", data?.photo[0]);
    } else {
      form.append("photo", "");
    }

    await handleUploadImgProfile(form);
  };

  const handleUploadImgProfile = async (form) => {
    try {
      setLoading(true);
      // Call Backend
      const { data } = await axios.patch(
        `https://blog-backend-amwb.onrender.com/v1/user/profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data",
            Accept: "applocation/json",
          },
        }
      );
      setLoading(false);
      localStorage.setItem("userPhoto", data.data.photo);
      toast.success("Profile Image Updated Successfully");
      // Update app state
      handleUploadImgUser(data.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong, please try again later");
    }
  };

  // -------- Preview Image ---------
  const handleChangeImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const removeSelectedImage = (e) => {
    setSelectedImage(""); // remove image preview as UI
    resetField("photo"); // clear input file value
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative flex flex-col justify-center items-center">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="form-group flex flex-col gap-4 justify-center items-center">
              <h4 className="font-bold text-lg text-gray-900">
                Update Profile Image
              </h4>
              {!selectedImage ? (
                <>
                  <label
                    className="flex flex-col justify-center rounded-full bg-[#f2f2f2] cursor-pointer w-48 h-48 text-white"
                    style={{
                      backgroundImage:
                        "url(https://i.ibb.co/LQn4pHG/profile.png",
                      backgroundSize: "cover",
                    }}
                    htmlFor="file_input_profile"
                    id="file_label_profile"
                  >
                    <div className="flex flex-col justify-center items-center bg-[#00000049] w-full h-full rounded-full">
                      <UploadIcon />
                      <span className="text-lg font-bold mt-2">
                        Upload Image
                      </span>
                    </div>
                  </label>
                  <input
                    id="file_input_profile"
                    type="file"
                    name="photo"
                    {...register("photo", {
                      onChange: (e) => {
                        handleChangeImage(e);
                      },
                    })}
                  />
                </>
              ) : (
                <div className="w-48 h-48 relative">
                  <img
                    src={selectedImage}
                    alt="Movie"
                    className="w-48 h-48 object-cover rounded-full"
                  />
                  <button
                    onClick={removeSelectedImage}
                    className="text-white bg-[#000000b3] bg-red-500  hover:bg-red-600 focus:outline-none font-medium rounded-full text-sm p-[0.5rem] text-center inline-flex items-center justify-center absolute right-0 top-0"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </div>

            <div className="form-control mt-6">
              <div className="flex flex-row justify-center items-center gap-2">
                <label
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                  htmlFor="my-modal"
                >
                  ✕
                </label>

                <button type="submit" className="btn btn-primary capitalize">
                  <span>
                    {loading && (
                      <Loader w={"w-6"} h={"h-6"} color={"fill-white"} />
                    )}{" "}
                  </span>
                  {loading ? "Updating ..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
