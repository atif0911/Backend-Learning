const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home Page",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "Home Page",
      currentPage: "home",
    });
  });
};

exports.getHomeList = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/homeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "HomeList",
    });
  });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "Booking Page",
    currentPage: "Booking",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite((favourites) => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home.id)
      );
      res.render("store/favouriteList", {
        favouriteHomes: favouriteHomes,
        pageTitle: "Favourite List Page",
        currentPage: "favouriteList",
      });
    });
  });
};

exports.postFavouriteList = (req, res, next) => {
  console.log("Came to add to favourites", req.body);
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourite", error);
    }
    res.redirect("/favouriteList");
  });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("error", error);
    }
    res.redirect("/favouriteList");
  });
};

exports.getReserve = (req, res, next) => {
  res.render("store/reserve", {
    pageTitle: "Reserve Page",
    currentPage: "Reserve",
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("No home found");
      res.redirect("/homeList");
    } else {
      console.log("Home details found", home);
      res.render("store/homeDetails", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
      });
    }
  });
};
