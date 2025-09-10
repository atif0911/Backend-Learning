const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/host/hostHomeList");
    } else {
      console.log(homeId, editing, home);
      res.render("host/editHome", {
        home: home,
        pageTitle: "Edit Your Home",
        currentPage: "hostHome",
        editing: editing,
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, pricePerNight, location, rating, photo, description } =
    req.body;
  const home = new Home({
    houseName,
    pricePerNight,
    location,
    rating,
    photo,
    description,
  });
  home.save().then(() => {
    console.log("Home saved Successfully");
  });
  res.redirect("/host/hostHomeList");
};

exports.postEditHome = (req, res, next) => {
  const { houseName, pricePerNight, location, rating, photo, description, id } =
    req.body;
  Home.findById(id).then((home) => {
    home.houseName = houseName;
    home.pricePerNight = pricePerNight;
    home.location = location;
    home.rating = rating;
    home.photo = photo;
    home.description = description;
    home.save().then((result) => {
      console.log("Home Updated: ", result);
    });
    res.redirect("/host/hostHomeList");
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home Page",
      currentPage: "hostHome",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/hostHomeList");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    })
    .catch((err) => {
      console.log("Error while finding home", err);
    });
};
