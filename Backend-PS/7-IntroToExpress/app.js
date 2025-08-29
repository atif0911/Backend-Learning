//External modules
const express=require('express');

//Local modules
const requestHandler=require('./user')

const app=express();

app.use("/",(req,res,next)=>{
    console.log("Came in first middleware",req.url,req.method);
    next();
})

app.use("/submit-details",(req,res,next)=>{
    console.log("Came in second middleware",req.url,req.method);
    res.send('<p>Hello from Express</p>');
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on address: http://localhost:${PORT}`);
});

//6.52.40