const { Notes } = require("../Model/notes.model");

const handleNotesStoreController = async (req, res) => {
  try {
    const body = req.body;

    if (!body.PaperCode || !body.PaperName || !body.Description) {
      return res.status(400).json({
        Message: "All fields are required",
        Success: false,
      });
    }

    //const notesAdd = await Notes.create(body);
    const note = new Notes({
      ...req.body,
      UserId: req.user.id,
    });

    const notesAdd = await note.save();

    if (notesAdd) {
      return res.status(201).json({
        Message: "Data inserted Successfully",
        Success: true,
        Id: notesAdd?._id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
      Success: false,
    });
  }
};

const handleNotesListController = async (req, res) => {
  try {
    const notesList = await Notes.find({ UserId: req.user.id });
    const mappedNotes = notesList.map((note) => ({
      ...note.toObject(),
      Id: note._id,
    }));

    return res.status(200).json({
      Message: "All Notes fetched Successfully",
      Success: true,
      TotalCount: mappedNotes.length,
      NotesList: mappedNotes,
    });
  } catch (error) {
    return res.status(400).json({
      Message: error.message,
      Success: false,
    });
  }
};

const handleNotesDeleteController = async (req, res) => {
  try {
    const { id } = req.params; // ✅ Use params instead of body
    const deleted = await Notes.findByIdAndDelete({
      _id: id,
      UserId: req.user.id,
    });

    if (deleted) {
      return res.status(200).json({
        Message: "Note Deleted Successfully",
        Success: true,
      });
    } else {
      return res.status(404).json({
        Message: "Note not found",
        Success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      Message: error.message,
      Success: false,
    });
  }
};

const handleNotesUpdateController = async (req, res) => {
  try {
    const body = req.body;
    const updating = await Notes.findByIdAndUpdate(
      { _id: body.Id, UserId: req.user.id },
      body,
      {
        new: true,
      }
    );

    if (updating) {
      return res.json({
        Message: "Note Updated Successfully",
        Success: true,
      });
    } else {
      return res.status(404).json({
        Message: "Note not found",
        Success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      Message: error.message,
      Success: false,
    });
  }
};

module.exports = {
  handleNotesStoreController,
  handleNotesListController,
  handleNotesDeleteController,
  handleNotesUpdateController,
};
