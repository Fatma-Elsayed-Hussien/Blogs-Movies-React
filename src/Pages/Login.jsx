import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../Components/Input";
import EyeShow from "../assets/Icons/EyeShow";
import EyeSlash from "../assets/Icons/EyeSlash";
import Loader from "../Components/Loader";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is a required field")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is not valid"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (dataForm) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://blog-backend-amwb.onrender.com/v1/users/sign-in",
        dataForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("userToken", data.data.access_token);
      localStorage.setItem("userId", data.data.user._id);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      const { data } = error.response;
      toast.error(data.message);
    }
  };

  const handleShow = () => {
    setShow(!show);
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
              <img src="https://i.ibb.co/vwk6CCY/login.png" />
            </div>
          </div>
          <div className="card-body lg:w-1/4 sm:w-11/12 md:w-1/2 w-full lg:p-8 md:p-8 p-4">
            <h3 className="text-3xl font-bold mb-16 text-center">Login</h3>
            <form onSubmit={handleSubmit(formSubmit)}>
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
                  type={show ? "text" : "password"}
                  placeholder="password"
                  register={{ ...register("password") }}
                  errorMessage={errors.password?.message}
                />
                <span
                  className="absolute top-12 right-4 cursor-pointer"
                  onClick={handleShow}
                >
                  {show ? <EyeShow /> : <EyeSlash />}
                </span>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary capitalize">
                  <span>
                    {loading && <Loader w={"6"} color={"fill-white"} />}{" "}
                  </span>
                  Login
                </button>
              </div>
              <div className="form-control mt-5 text-center">
                <span>
                  Don't have an Account?{" "}
                  <Link
                    to={"/register"}
                    className="text-blue-600 link link-hover"
                  >
                    Signup
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
