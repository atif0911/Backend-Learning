const express=require('express');
const bodyParser=require('body-parser');


const app=express();

app.use((req,res,next)=>{
    console.log("Came in first middleware",req.url,req.method);
    next();
})

app.use((req,res,next)=>{
    console.log("Came in second middleware",req.url,req.method);
    next();
})

// app.use((req,res,next)=>{
//     console.log("Came in third middleware",req.url,req.method);
//     res.send('<p>Hello from Express</p>');
// })

app.get("/",(req,res,next)=>{
    console.log("Handling / for get",req.url,req.method);
    res.send('<p>You are in /</p>');
})

app.get("/contact-us",(req,res,next)=>{
    console.log("Handling /contact-us for get",req.url,req.method);
    res.send(`
        <h1>Contact Us Page</h1>
        <form action="/contact-us" method="POST">
            <input type="text" name="name" placeholder="Enter your name"><br>
            <input type="email" name="email" placeholder="Enter your email"><br>
            <button type="submit">Send</button>
        `);
});

app.use(bodyParser.urlencoded())

app.post("/contact-us",(req,res,next)=>{
    console.log("Handling /contact-us for post",req.url,req.method,req.body);
    res.send('<h1>Thanks for contacting us. We will get back to you soon!</h1>');
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on address: http://localhost:${PORT}`);
});