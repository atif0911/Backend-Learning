import React, { useEffect, useState } from "react";
import { userBaseUrl } from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "./Header";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    Email: "",
    Password: "",
  });

  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.isLogin) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    //logi
    e.preventDefault();
    try {
      const { data } = await userBaseUrl.post("/login", loginForm);
      const authData = {
        isLogin: true,
        Token: data?.Token,
      };
      if (data?.Success) {
        localStorage.setItem("userAuth", JSON.stringify(authData));
        navigate("/");
      }
    } catch (error) {
      console.log("login error", error);
      const errorMessage = error?.response?.data;
      if (!errorMessage?.status) {
        toast.error(errorMessage.Message);
      }
    }
  };

  return (
    <>
      <Header></Header>
      <div className="pt-4">
        <form
          className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto "
          onSubmit={handleLogin}
        >
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="email"
              name="Email"
              value={loginForm.Email}
              onChange={handleChange}
              required
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="password"
              name="Password"
              value={loginForm.Password}
              onChange={handleChange}
              required
              placeholder="Enter Your Password"
            />
          </div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <span>Don't have an account? </span>
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
