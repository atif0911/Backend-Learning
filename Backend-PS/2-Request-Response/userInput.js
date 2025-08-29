const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers)

    if(req.url==='/'){
        res.write('<html>');    
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><h1>Welcome to HomePage</h1></body>');
        res.write('<body><h1>Enter your form Details</h1>');
        res.write('</body>');
        res.write('<form action="/submit-details" method="POST">');
        res.write('<input type="text" name="message" placeholder="Enter your message"><br>');
        res.write('<label for="male">Male</label>')
        res.write('<input type="radio" id="male" name="gender" value="male" /><br>')
        res.write('<label for="female">FeMale</label>')
        res.write('<input type="radio" id="female" name="gender" value="female" /><br>')
        res.write('<br><button type="submit">Send</button>');
        res.write('</form>');
        res.write('</html>');
        return res.end();
    }else if(req.url.toLowerCase()==='/submit-details' && req.method==='POST'){
        fs.writeFileSync('userInput.txt','Dummy text!');
        res.statusCode=302;
        res.setHeader('Location','/');
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');    
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>U can see messages here</h1></body>');
    res.write('</html>');
    return res.end();
    
    
});

const PORT=3000;

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

//2.51.30