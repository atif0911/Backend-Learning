const path=require('path');

const express = require('express');

const hostRouter=express.Router();

const rootDir=require('../utils/pathUtil');
const { register } = require('module');

hostRouter.get('/add-home',(req,res,next)=>{
    res.render('addHome',{pageTitle:'Add Home',currentPage: "addHome"});
})

const registeredHomes=[];

hostRouter.post('/add-home',(req,res,next)=>{
    console.log("Home added",req.body,req.body.houseName);
    registeredHomes.push(req.body);
    res.render('homeAdded',{pageTitle:'Home added',currentPage: "homeAdded"})
})

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
