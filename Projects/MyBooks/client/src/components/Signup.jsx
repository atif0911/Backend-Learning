import React, { useEffect, useState } from "react";
import { userBaseUrl } from "../../axiosInstance";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();

  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);
  useEffect(() => {
    if (authUser?.isLogin) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignup = async (e) => {
    //create
    e.preventDefault();
    try {
      const { data } = await userBaseUrl.post("/create", signupForm);
      if (data.status) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log("signup error", err);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="pt-4">
        <form
          className="bg-gray-100 shadow-md rounded px-8 pt-8 pb-8 mb-4 max-w-md mx-auto "
          onSubmit={handleSignup}
        >
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              First Name
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="text"
              name="FirstName"
              value={signupForm.FirstName}
              onChange={handleChange}
              required
              placeholder="First Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Last Name
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="text"
              name="LastName"
              value={signupForm.LastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="email"
              name="Email"
              value={signupForm.Email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="password"
              name="Password"
              value={signupForm.Password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign Up
          </button>
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
