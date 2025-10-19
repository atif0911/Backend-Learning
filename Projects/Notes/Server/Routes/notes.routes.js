const express = require('express');
const router = express.Router();

const {
  handleNotesStoreController,
  handleNotesListController,
  handleNotesDeleteController,
  handleNotesUpdateController
} = require("../Controller/notes.controller");

router.post('/addnotes', handleNotesStoreController);
router.get("/noteslist", handleNotesListController);
router.delete("/deletenotes/:id", handleNotesDeleteController);
router.put("/updatenotes/:id", handleNotesUpdateController);


module.exports = router;