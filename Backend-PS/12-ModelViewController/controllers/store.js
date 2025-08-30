const Home = require('../models/home');

exports.getHomes = (req, res, next) => {
    const registeredHomes = Home.fetchAll((registeredHomes) => {
        res.render('store/home', { registeredHomes: registeredHomes, pageTitle: 'Home Page', currentPage: "Home" });
    });
}

exports.getHomeList = (req, res, next) => {
    const registeredHomes = Home.fetchAll((registeredHomes) => {
        res.render('store/homeList', { registeredHomes: registeredHomes, pageTitle: 'Home List', currentPage: "HomeList" });
    });
}

exports.getBooking = (req, res, next) => {
    res.render('store/booking', { pageTitle: 'Booking Page', currentPage: "Booking" });
}

exports.getFavouriteList = (req, res, next) => {
    const registeredHomes = Home.fetchAll((registeredHomes) => {
        res.render('store/favouriteList', { registeredHomes: registeredHomes, pageTitle: 'Favourite List Page', currentPage: "favouriteList" });
    });
}

exports.getReserve = (req, res, next) => {
    res.render('store/reserve', { pageTitle: 'Reserve Page', currentPage: "Reserve" });
}

