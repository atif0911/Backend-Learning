const { Book } = require("../Models/book.model");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;
    if (
      !body.BookName ||
      !body.BookDescription ||
      !body.Author ||
      !body.SellingPrice
    ) {
      return res
        .status(400)
        .json({ Message: "All Fields are required", Success: false });
    }

    const bookAdd = await Book.insertOne(body);
    if (bookAdd) {
      return res.status(201).json({
        Message: "Data Inserted Successfully",
        Success: true,
        Id: bookAdd?._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleBookListController = async (req, res) => {
  try {
    const bookList = await Book.find({});
    return res.status(200).json({
      Message: "All Books fetched Successfully",
      Success: true,
      TotalCount: bookList.length,
      BookList: bookList,
    });
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

const handleBookDeleteController = async (req, res) => {
  try {
    const body = req.body;
    const deleted = await Book.deleteOne({ _id: body.Id });
    console.log("deleted", deleted);
    if (deleted.acknowledged) {
      return res.json({ Message: "Book Deleted Successfully", Success: true });
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

const handleBookUpdateController = async (req, res) => {
  try {
    const body = req.body;
    const updating = await Book.updateOne({ _id: body?.Id }, { $set: body });
    if (updating?.acknowledged) {
      return res.json({ Message: "Book Updated Successfully", Success: true });
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
};
