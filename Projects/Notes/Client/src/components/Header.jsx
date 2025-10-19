import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      {/* Logo - Left */}
      <div className="flex items-center space-x-2">
        {/* Replace with your logo image or icon */}
        <span className="text-2xl font-bold text-indigo-600">NotesApp</span>
      </div>

      {/* Centered Navigation */}
      {authUser?.isLogin ? (
        <>
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-6">
              <li>
                <button
                  className="text-md font-medium text-gray-700 hover:text-indigo-600 transition"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className="text-md font-medium text-gray-700 hover:text-indigo-600 transition"
                  onClick={() => navigate("/addnotes")}
                >
                  Add Notes
                </button>
              </li>
              <li>
                <button
                  className="text-md font-medium text-gray-700 hover:text-indigo-600 transition"
                  onClick={() => navigate("/viewnotes")}
                >
                  View Notes
                </button>
              </li>
            </ul>
          </nav>

          {/* Logout - Right */}
          <div>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
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
    </header>
  );
};

export default Header;
