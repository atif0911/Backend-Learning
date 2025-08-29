const http=require('http');
const fs=require('fs');

const requestHandler=(req,res)=>{
    console.log(req.url,req.method)

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
        const body=[];
        req.on('data',chunk=>{ //sending data in chunks
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{ //when all data is received
            const parsedBody=Buffer.concat(body).toString();
            console.log(parsedBody);
            const params=new URLSearchParams(parsedBody);
            // const bodyObj={};
            // for (const [key,value] of params.entries()){
            //     bodyObj[key]=value;
            //     console.log(key,value);
            // }
            // or
            const bodyObj=Object.fromEntries(params);
            console.log(bodyObj);
            fs.writeFileSync('userInput.txt',JSON.stringify(bodyObj));
        });
        res.statusCode=302;
        res.setHeader('Location','/');
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');    
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>U can see messages here</h1></body>');
    res.write('</html>');
    return res.end();
    
    
};

module.exports=requestHandler;