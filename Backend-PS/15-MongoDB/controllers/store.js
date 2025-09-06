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
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "Home Page",
      currentPage: "home",
    });
  });
};

exports.getHomeList = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
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
  Favourite.getFavourite().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId);
    Home.fetchAll().then((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
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
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log("Fav Added: ", result);
    })
    .catch((err) => {
      console.log("Error while marking favourite", err);
    })
    .finally(() => {
      res.redirect("/favouriteList");
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
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
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
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
      });
    }
  });
};
