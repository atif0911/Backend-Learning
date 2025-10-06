import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    navigate("/login");
  };
  return (
    <div className="w-full flex justify-between h-15 items-center bg-gray-200 shadow px-5">
      <div className="w-[10%] flex items-center h-full">
        <h1 className="font-bold text-zinc-800">MyBooks</h1>
      </div>
      <div className="w-[50%] h-full">
        <ul className="w-full h-full flex gap-6 list-none items-center text-zinc-800 font-medium">
          <li className="cursor-pointer" onClick={() => navigate("/")}>
            HOME
          </li>
          <li className="cursor-pointer">ABOUT</li>
          <li className="cursor-pointer">CONTACT</li>
          <li className="cursor-pointer"></li>
        </ul>
      </div>
      <button
        className="py-1 px-4 bg-gray-500 rounded text-white cursor-pointer"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Navbar;
