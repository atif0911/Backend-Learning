const sumRequestHandler=(req,res)=>{
    console.log('Inside sum request handler');
    const body=[];
    req.on('data',(chunk)=>{
        body.push(chunk);
    });
    req.on('end',()=>{
        const bodyStr=Buffer.concat(body).toString();
        const parsedBody=new URLSearchParams(bodyStr);
        const bodyObj=Object.fromEntries(parsedBody);
        const result=Number(bodyObj.num1)+Number(bodyObj.num2);
        console.log(result);
        res.setHeader('Content-Type','text/html');
        res.write(`
            <html>
                <head><title>Practice Set</title></head>
                <body>
                    <h1>Your sum is ${result}</h1>
                    <a href="/">Go to Home</a>
                </body>
            </html>
            `);
        return res.end();
    })
}

exports.sumRequestHandler=sumRequestHandler;