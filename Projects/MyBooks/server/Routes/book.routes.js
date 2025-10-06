const express = require("express");
const {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
} = require("../Controller/book.controller");

const router = express.Router();

// http:/localhost:8000/book/addbook
router.post("/addbook", handleBookStoreController);
router.get("/booklists", handleBookListController);
router.post("/deletebook", handleBookDeleteController);
router.put("/updatebook", handleBookUpdateController);

module.exports = router;
