const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
    res.render('host/editHome', { pageTitle: 'Add Home', currentPage: "addHome", editing: false });
}

exports.getEditHome = (req, res, next) => {
    const homeId=req.params.homeId;
    const editing=req.query.editing === "true";

    Home.findById(homeId, home=>{
        if(!home){
            console.log("Home not found")
            res.redirect("/host/hostHomeList")
        } else{
            console.log(homeId,editing,home)
            res.render('host/editHome', { home: home, pageTitle: 'Edit Your Home', currentPage: "hostHome",editing: editing });
        }
    })
}

exports.postAddHome = (req, res, next) => {
    const { houseName, pricePerNight, location, rating, photo } = req.body
    const home = new Home(houseName, pricePerNight, location, rating, photo)
    home.save();
    res.redirect('/host/hostHomeList');
}

exports.postEditHome = (req, res, next) => {
    const { id, houseName, pricePerNight, location, rating, photo } = req.body;
    const home = new Home(houseName, pricePerNight, location, rating, photo);
    home.id=id;
    home.save();
    res.redirect('/host/hostHomeList');
}


exports.getHostHomes = (req, res, next) => {
    const registeredHomes = Home.fetchAll((registeredHomes) => {
        res.render('host/hostHomeList', { registeredHomes: registeredHomes, pageTitle: 'Host Home Page', currentPage: "hostHome" });
    });
}

exports.postDeleteHome=(req, res,next)=>{
    const homeId=req.params.homeId;
    Home.deleteById(homeId,error=>{
        if(error){
            console.log("Error while deleting")
        }
        res.redirect("/host/hostHomeList")
    })
}