import React, { useState, useEffect } from "react";
import Header from "./Header";
import { notesBaseUrl } from "../../axiosInstance";
import { FiEdit, FiX, FiSave } from "react-icons/fi";

const ViewNotes = () => {
  const [notesList, setNotesList] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});

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

  const handleDelete = async (id) => {
    try {
      const { data } = await notesBaseUrl.delete(`deletenotes/${id}`);
      if (data?.Success) {
        getAllPaperList();
        setSelectedNote(null);
      }
    } catch (error) {
      console.log("Error while deleting ", error);
    }
  };

  const handleEditClick = (note) => {
    setEditForm({
      PaperCode: note?.PaperCode,
      PaperName: note?.PaperName,
      Topic: note?.Topic,
      Description: note?.Description,
      Id: note?._id||note?.Id,
    });
    setEditMode(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const { data } = await notesBaseUrl.put("updatenotes", editForm);
      if (data?.Success) {
        getAllPaperList();
        setSelectedNote(editForm);
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 px-6 py-10 sm:px-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          All Notes
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notesList.map((note, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-md p-6 cursor-pointer hover:scale-[1.02] transition"
              onClick={() => {
                setSelectedNote(note);
                setEditMode(false);
              }}
            >
              <h2 className="text-lg font-semibold text-indigo-600 mb-1">
                {note.PaperName}
              </h2>
              <p className="text-sm text-gray-600">{note.Topic}</p>
              <p className="text-xs text-gray-400 mt-3">{note.PaperCode}</p>
              <p className="mt-3 text-gray-700 line-clamp-2">
                {note.Description}
              </p>
            </div>
          ))}
        </div>

        {/* Note details modal */}
        {selectedNote && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-xl w-full max-w-lg p-8 relative">
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-indigo-600"
              >
                <FiX size={24} />
              </button>
              {!editMode ? (
                <div>
                  <h2 className="text-xl font-bold text-indigo-600 mb-2">
                    {selectedNote.PaperName}
                  </h2>
                  <p className="font-medium text-gray-700 mb-3">
                    {selectedNote.Topic}
                  </p>
                  <p className="text-xs text-gray-400 mb-6">
                    {selectedNote.PaperCode}
                  </p>
                  <div className="mb-6">
                    <p className="text-gray-800 whitespace-pre-line">
                      {selectedNote.Description}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
                      onClick={() => handleEditClick(selectedNote)}
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                      onClick={() => handleDelete(selectedNote.Id)}
                    >
                      <FiX /> Delete
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paper Code
                    </label>
                    <input
                      type="text"
                      name="PaperCode"
                      value={editForm.PaperCode}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paper Name
                    </label>
                    <input
                      type="text"
                      name="PaperName"
                      value={editForm.PaperName}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Topic
                    </label>
                    <input
                      type="text"
                      name="Topic"
                      value={editForm.Topic}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="Description"
                      value={editForm.Description}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-vertical min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="flex gap-4 justify-end">
                    <button
                      type="button"
                      className="bg-gray-100 border border-gray-400 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex gap-2 items-center bg-indigo-600 text-white px-5 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
                    >
                      <FiSave /> Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewNotes;
