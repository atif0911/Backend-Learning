const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
    res.render('host/editHome', { pageTitle: 'Add Home', currentPage: "addHome" });
}

exports.getEditHome = (req, res, next) => {
    const homeId=req.params.homeId;
    const editing=req.query.editing;
    res.render('host/editHome', { pageTitle: 'Edit Your Home', currentPage: "hostHome",editing: "editing" });
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