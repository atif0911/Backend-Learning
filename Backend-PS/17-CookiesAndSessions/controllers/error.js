exports.notFoundController = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "404 Not found",
      currentPage: "404",
      isLoggedIn: req.isLoggedIn,
    });
};
