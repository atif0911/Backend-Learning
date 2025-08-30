const path=require('path');

const express = require('express');

const hostRouter=express.Router();

const rootDir=require('../utils/pathUtil');
const { register } = require('module');

hostRouter.get('/add-home',(req,res,next)=>{
    res.render('addHome',{pageTitle:'Add Home'});
})

const registeredHomes=[];

hostRouter.post('/add-home',(req,res,next)=>{
    console.log("Home added",req.body,req.body.houseName);
    registeredHomes.push({houseName:req.body.houseName,address:req.body.address});
    res.render('homeAdded',{pageTitle:'Home added'})
})

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
