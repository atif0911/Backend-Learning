const express=require('express');
const path=require('path');


const homeRoute=require("./routes/homeRoute.js");
const contactUsRoute=require("./routes/contactUsRoute.js");
const rootDir=require('./utils/pathUtils.js');

const app=express();

app.use(express.urlencoded());
app.use(homeRoute);
app.use(contactUsRoute);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,"views","404.html"))
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on address: http://localhost:${PORT}`);
});