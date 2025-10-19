import React from "react";
import Header from "./Header";
import { notesBaseUrl } from "../../axiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

const AddNotes = () => {
  const [notesForm, setNotesForm] = useState({
    PaperCode: "",
    PaperName: "",
    Topic: "",
    Description: "",
    Id: "",
  });

  const [notesList, setNotesList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getAllPaperList = async () => {
    try {
      const { data } = await notesBaseUrl.get("noteslist");
      setNotesList(data?.NotesList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPaperList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNotesForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!isUpdating) {
        if (
          !notesForm?.PaperCode ||
          !notesForm?.PaperName ||
          !notesForm?.Description
        ) {
            alert("all fields are required!");
            return;
        }
        const { data } = await notesBaseUrl.post("/addnotes", notesForm);
        if (data?.Success) {
          getAllPaperList();
          setNotesForm({
            PaperCode: "",
            PaperName: "",
            Topic: "",
            Description: "",
            Id: "",
          });
        }
      } else {
        const { data } = await notesBaseUrl.put("/updatenotes", notesForm);
        if (data?.Success) {
          getAllPaperList();
          setNotesForm({
            PaperCode: "",
            PaperName: "",
            Topic: "",
            Description: "",
            Id: "",
          });
          setIsUpdating(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    setNotesForm({
      PaperCode: data?.PaperCode,
      PaperName: data?.PaperName,
      Topic: data?.Topic,
      Description: data?.Description,
      Id: data?.Id,
    });
    setIsUpdating(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Main Layout */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-30 p-5`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-indigo-600">
              Notes List
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-indigo-600"
            >
              <AiOutlineClose size={22} />
            </button>
          </div>
          <ul className="overflow-y-auto max-h-[80vh]">
            {notesList.map((note, index) => (
              <li
                key={index}
                className="py-2 px-3 rounded-md hover:bg-indigo-50 cursor-pointer"
                onClick={() => handleUpdate(note)}
              >
                <p className="text-sm font-semibold text-gray-700">
                  {note.PaperName}
                </p>
                <p className="text-xs text-gray-500">{note.Topic}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Form Section */}
        <div className="flex-1 px-6 py-10 sm:px-10">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-indigo-600 mr-3"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {isUpdating ? "Update Note" : "Add a New Note"}
            </h1>
          </div>

          <div className="bg-white shadow-md rounded-md p-6 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Paper Code
                </label>
                <input
                  type="text"
                  name="PaperCode"
                  value={notesForm.PaperCode}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter paper code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Paper Name
                </label>
                <input
                  type="text"
                  name="PaperName"
                  value={notesForm.PaperName}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter paper name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Topic
                </label>
                <input
                  type="text"
                  name="Topic"
                  value={notesForm.Topic}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter topic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  name="Description"
                  value={notesForm.Description}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  rows="5"
                  placeholder="Enter detailed description"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {isUpdating ? "Update Note" : "Add Note"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNotes;
