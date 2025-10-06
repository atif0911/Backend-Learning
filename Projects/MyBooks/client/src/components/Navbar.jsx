import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-between h-15 items-center bg-gray-200 shadow px-5">
      <div className="w-[10%] flex items-center h-full">
        <h1
          className="font-bold text-zinc-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyBooks
        </h1>
      </div>

      {authUser?.isLogin ? (
        <>
          <div className="w-[50%] h-full">
            <ul className="w-full h-full flex gap-6 list-none items-center text-zinc-800 font-medium ">
              <li
                className="cursor-pointer hover:bg-gray-300"
                onClick={() => navigate("/")}
              >
                HOME
              </li>
              <li
                className="cursor-pointer hover:bg-gray-300"
                onClick={() => navigate("/addbook")}
              >
                ADDBOOK
              </li>
            </ul>
          </div>
          <button
            className="py-1 px-4 bg-red-600 rounded hover:bg-red-700 text-white cursor-pointer"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </>
      ) : (
        <div className="flex gap-4">
          <button
            className="py-1 px-4 bg-blue-600 rounded text-white cursor-pointer hover:bg-blue-700"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>
          <button
            className="py-1 px-4 bg-green-600 rounded text-white cursor-pointer hover:bg-green-700"
            onClick={() => navigate("/signup")}
          >
            SIGNUP
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
