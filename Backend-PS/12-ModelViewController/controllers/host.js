const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
    res.render('host/addHome', { pageTitle: 'Add Home', currentPage: "addHome" });
}

exports.postAddHome = (req, res, next) => {
    const { houseName, pricePerNight, location, rating, photo } = req.body
    const home = new Home(houseName, pricePerNight, location, rating, photo)
    home.save();
    res.render('host/homeAdded', { pageTitle: 'Home added', currentPage: "homeAdded" })
}

exports.getHostHomes = (req, res, next) => {
    const registeredHomes = Home.fetchAll((registeredHomes) => {
        res.render('host/hostHomeList', { registeredHomes: registeredHomes, pageTitle: 'Host Home Page', currentPage: "hostHome" });
    });
}