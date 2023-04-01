import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../Components/Input";
import EyeShow from "../assets/Icons/EyeShow";
import EyeSlash from "../assets/Icons/EyeSlash";
import Loader from "../Components/Loader";

const schema = yup.object({
  username: yup
    .string()
    .required("Username is a required field")
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z ]*$/, "Username must be only text characters"),
  email: yup
    .string()
    .required("Email is a required field")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is not valid"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is a required field")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  gender: yup
    .string()
    .required("Gender is a required field")
    .matches(/(female|male)/),
});

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      gender: "female",
    }
  });

  const formSubmit = async (dataForm) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://blog-backend-amwb.onrender.com/v1/users/sign-up",
        dataForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      const { data } = error.response;
      toast.error(data.message);
    }
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm);
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
              <img src="https://i.ibb.co/Tm3mBS7/signup.png" />
            </div>
          </div>
          <div className="card-body lg:w-1/4 sm:w-11/12 md:w-1/2 w-full lg:p-8 md:p-8 p-2">
            <h3 className="text-3xl font-bold mb-5 text-center">
              Create Account
            </h3>
            <form onSubmit={handleSubmit(formSubmit)}>
              <Input
                label="Username"
                name="username"
                type="text"
                placeholder="username"
                register={{ ...register("username") }}
                errorMessage={errors.username?.message}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="email"
                register={{ ...register("email") }}
                errorMessage={errors.email?.message}
              />
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="password"
                  register={{ ...register("password") }}
                  errorMessage={errors.password?.message}
                />
                <span
                  className="absolute top-12 right-4 cursor-pointer"
                  onClick={handleShowPass}
                >
                  {showPass ? <EyeShow /> : <EyeSlash />}
                </span>
              </div>
              <div className="relative">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="confirm password"
                  register={{ ...register("confirmPassword") }}
                  errorMessage={errors.confirmPassword?.message}
                />
                <span
                  className="absolute top-12 right-4 cursor-pointer"
                  onClick={handleShowConfirm}
                >
                  {showConfirm ? <EyeShow /> : <EyeSlash />}
                </span>
              </div>
              <div className="form-control flex flex-row mt-3 items-center">
                <label className="label mr-3">
                  <span className="label-text">Gender</span>
                </label>
                <div className="flex items-center mr-4">
                  <input
                    id="female-radio"
                    type="radio"
                    value="female"
                    name="gender"
                    className="radio radio-primary"
                    {...register("gender")}
                  />
                  <label
                    htmlFor="female-radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center mr-4">
                  <input
                    id="male-radio"
                    type="radio"
                    value="male"
                    name="gender"
                    className="radio radio-primary"
                    {...register("gender")}
                  />
                  <label
                    htmlFor="male-radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                  >
                    Male
                  </label>
                </div>
                <span className="error-message items-center justify-center">
                  {errors.gender?.message}
                </span>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary capitalize">
                  <span>
                    {loading && <Loader w={"6"} color={"fill-white"} />}{" "}
                  </span>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
