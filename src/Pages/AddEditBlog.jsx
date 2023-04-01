import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import Input from "../Components/Input";
import Loader from "../Components/Loader";
import CloseIcon from "../assets/Icons/CloseIcon";
import UploadIcon from "../assets/Icons/UploadIcon";

const schema = yup.object({
  photo: yup
    .mixed()
    .test("required", "Image is a required field", (value) => value.length > 0),
  title: yup.string().required("Title is a required field"),
  description: yup.string().required("Description is a a required field"),
});

export default function AddEditBlog({ handleAddNewPost, handleEditPost }) {
  const { postid } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      photo: "",
      title: "",
      description: "",
    },
  });

  const formSubmit = async (data) => {
    console.log(data);
    const form = new FormData();
    //Check if "photo" is not string(URL from backend) ---> in Edit mode
    if (data?.photo[0] && typeof getValues("photo") !== "string") {
      form.append("photo", data?.photo[0]);
    } else {
      console.log(getValues("photo"));
    }
    form.append("title", data.title);
    form.append("description", data.description);

    postid === "add" ? await handleAdd(form) : await handleEdit(form);
    // navigate to the blogs page
    navigate("/");
  };

  useEffect(() => {
    async function fetchPostById() {
      const { data } = await axios.get(
        `https://blog-backend-amwb.onrender.com/v1/post/${postid}`
      );
      console.log(data.data);

      setValue("photo", data.data.photo);
      console.log(getValues("photo"));
      setSelectedImage(data.data.photo);
      setValue("title", data.data.title);
      setValue("description", data.data.description);
    }
    if (postid !== "add") fetchPostById();
  }, []);

  const handleAdd = async (blogForm) => {
    try {
      setLoading(true);
      // Call Backend
      console.log(blogForm);
      const { data } = await axios.post(
        "https://blog-backend-amwb.onrender.com/v1/post",
        blogForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Blog Added Successfully");
      // Update app state
      handleAddNewPost(data.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleEdit = async (blogForm) => {
    try {
      setLoading(true);
      // Call Backend
      const { data } = await axios.patch(
        `https://blog-backend-amwb.onrender.com/v1/post/${postid}`,
        blogForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data",
            Accept: "applocation/json",
          },
        }
      );
      console.log(data);
      toast.success("Blog Updated Successfully");
      // Update app state
      handleEditPost(data.data);
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
      <div
        className="hero min-h-screen bg-base-200 p-2 sm:p-12 lg:p-4 md:p-4"
        style={{ display: "inherit" }}
      >
        <div className="card w-full shadow-2xl bg-base-100 hero-content flex-col lg:flex-row-reverse md:flex-row-reverse lg:max-w-6xl md:max-w-6xl m-auto">
          <div className="text-center lg:text-left w-2/4 sm:display-none">
            <div className="hidden lg:block md:block">
              {postid === "add" ? (
                <img src="https://i.ibb.co/RHXMhKw/AddBlog.png" />
              ) : (
                <img src="https://i.ibb.co/Q6DfT9y/EditBlog.png" />
              )}
            </div>
          </div>
          <div className="card-body lg:w-1/4 sm:w-11/12 md:w-1/2 w-full lg:p-8 md:p-8 p-2">
            <h1 className="lg:text-3xl md:text-[1.7rem] font-bold mb-4 text-center text-2xl">
              {postid === "add" ? "Create New Blog Post" : "Edit Blog Post"}
            </h1>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="form-group flex flex-col lg:flex-row md:flex-row gap-4 justify-center items-center">
                {!selectedImage ? (
                  <>
                    <label
                      className="flex flex-col justify-center rounded-2xl bg-[#f2f2f2] cursor-pointer w-4/5 h-[200px]"
                      htmlFor="file_input"
                      id="file_label"
                    >
                      <div className="flex flex-col justify-center items-center">
                        <UploadIcon />
                        <span className="text-lg font-bold mt-2">
                          Upload Image
                        </span>
                      </div>
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
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
                  <div className="w-4/5 h-64 relative">
                    <img
                      src={selectedImage}
                      alt="Movie"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <button
                      onClick={removeSelectedImage}
                      className="text-white bg-[#000000b3] bg-red-500  hover:bg-red-600 focus:outline-none font-medium rounded-full text-sm p-[0.4rem] text-center inline-flex items-center absolute right-[-1.1rem] top-[-1.1rem]"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                )}
              </div>
              <span className="error-message flex justify-center">
                {errors.photo?.message}
              </span>
              {watch("photo") || watch("photo").length !== 0 ? (
                <p className="flex justify-center break-all lg:break-normal items-end font-semibold text-[#570df8] text-center">
                  {watch("photo")[0].name}
                </p>
              ) : (
                ""
              )}

              <Input
                label="Title"
                name="title"
                type="text"
                placeholder="title"
                register={{ ...register("title") }}
                errorMessage={errors.title?.message}
              />

              <div className="form-control">
                <label htmlFor="description" className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  className={`textarea textarea-bordered focus:outline-none min-h-[9rem] ${
                    errors.description && "invalid"
                  }`}
                  placeholder="description"
                  {...register("description")}
                ></textarea>
                <span className="error-message">
                  {errors.description?.message}
                </span>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary capitalize">
                  <span>
                    {loading && <Loader w={"6"} color={"fill-white"} />}{" "}
                  </span>
                  {postid === "add" ? "Add Blog" : "Update Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
