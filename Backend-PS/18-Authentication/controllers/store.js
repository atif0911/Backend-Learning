const Home = require("../models/home");
const User = require("../models/user");
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

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favouriteList", {
    favouriteHomes: user.favourites,
    pageTitle: "Favourite List Page",
    currentPage: "favouriteList",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postFavouriteList = async (req, res, next) => {
  const houseId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(houseId)) {
    user.favourites.push(houseId);
    await user.save();
  }
  res.redirect("/favouriteList");
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);
    await user.save();
  }
  res.redirect("/favouriteList");
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
