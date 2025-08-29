const http=require('http');

const server=http.createServer((req,res)=>{
    console.log(req);
    process.exit(); // Exit after first request for demonstration
});

const PORT=3000;

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});