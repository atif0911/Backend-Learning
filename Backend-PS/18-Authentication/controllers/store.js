const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home Page",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "Home Page",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/homeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "HomeList",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "Booking Page",
    currentPage: "Booking",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.houseId);
      res.render("store/favouriteList", {
        favouriteHomes: favouriteHomes,
        pageTitle: "Favourite List Page",
        currentPage: "favouriteList",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    });
};

exports.postFavouriteList = (req, res, next) => {
  const houseId = req.body.id;
  Favourite.findOne({ houseId: houseId })
    .then((existingFav) => {
      if (existingFav) {
        console.log("Already marked as fav");
        return res.redirect("/favouriteList");
      }
      const fav = new Favourite({ houseId: houseId });
      return fav.save();
    })
    .then(() => {
      res.redirect("/favouriteList");
    })
    .catch((err) => {
      console.log("Error while marking fav: ", err);
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({ houseId: homeId })
    .then((result) => {
      console.log("Fav Removed: ", result);
    })
    .catch((err) => {
      console.log("Error while deleting favourite", err);
    })
    .finally(() => {
      res.redirect("/favouriteList");
    });
};

exports.getReserve = (req, res, next) => {
  res.render("store/reserve", {
    pageTitle: "Reserve Page",
    currentPage: "Reserve",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("No home found");
      res.redirect("/homeList");
    } else {
      console.log("Home details found", home);
      res.render("store/homeDetails", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};
