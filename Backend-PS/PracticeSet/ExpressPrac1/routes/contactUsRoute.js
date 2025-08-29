const path=require("path");
const express=require("express");
const contactUsRoute=express.Router();
const rootDir=require("../utils/pathUtils.js");

contactUsRoute.get("/contact-us",(req,res,next)=>{
    res.sendFile(path.join(rootDir,"views","contactUs.html"))
});

contactUsRoute.post("/contact-us",(req,res,next)=>{
    console.log(req.body);
    res.sendFile(path.join(rootDir,"views","contactUsSuccess.html"))
});

module.exports=contactUsRoute;