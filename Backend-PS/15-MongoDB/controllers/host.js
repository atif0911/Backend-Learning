const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then(home => {
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
      });
    }
  });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, pricePerNight, location, rating, photo, description } =
    req.body;
  console.log(houseName, pricePerNight, location, rating, photo, description);
  const home = new Home(
    houseName,
    pricePerNight,
    location,
    rating,
    photo,
    description
  );
  home.save().then(() => {
    console.log("Home saved Successfully");
  });
  res.redirect("/host/hostHomeList");
};

exports.postEditHome = (req, res, next) => {
  const { houseName, pricePerNight, location, rating, photo, description, id } =
    req.body;
  const home = new Home(
    houseName,
    pricePerNight,
    location,
    rating,
    photo,
    description,
    id
  );
  home.save().then(result => {
    console.log("Home editted Successfully", result);
  });
  res.redirect("/host/hostHomeList");
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home Page",
      currentPage: "hostHome",
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/hostHomeList");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};
