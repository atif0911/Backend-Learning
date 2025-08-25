const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || '3000';

app.get("/", async(req, res) => {   // '/' get requests on root route 
    res.send("<h1>Ami bhije gelam</h1>");
});

app.get("/test", async(req, res) => {   
    res.sendFile(path.join(__dirname,"test.html"));    
});

app.get("/test2", async(req, res) => {   
    res.status(200).json({
        name: "Atif",
        age: 21,
        message: "I am from json"
    });    //200- everything is ok
});

app.get("/error", async(req, res) => {
    try {
        const div=10/10; // in js division by 0 is infinity not error
        if(!isFinite(div)){
            throw new Error("Division by zero not possible");
        }
        res.status(200).json({
        message: "Success"
    }); 
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        }); //500- server error
        console.log(error);
    }
});

app.listen(PORT, () => {    //Listens to all the requests on the port and caters it
    console.log(`Server is running on port ${PORT}`);
});