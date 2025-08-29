const {sumRequestHandler}=require('./sum');

const requestHandler=(req,res)=>{
    console.log(req.url,req.method);
    if(req.url==='/'){
        res.setHeader('Content-Type','text/html');
        res.write(`
            <html>
                <head><title>Practice Set</title></head>
                <body>
                    <h1>Welcome to Calculator</h1>
                    <a href="/calculator">Go to Calculator</a>
                </body>
            </html>
            `);
            return res.end();
    } else if(req.url.toLowerCase()==='/calculator'){
        res.setHeader('Content-Type','text/html');
        res.write(`<html>
                <head><title>Practice Set</title></head>
                <body>
                    <h1>Calculator</h1>
                    <form action="/calculator-result" method="POST">
                        <input type="text" name="num1" placeholder="Enter first number" >
                        <input type="text" name="num2" placeholder="Enter second number" >
                        <input type="submit" value="Calculate">
                    </form>
                </body>
            </html>`);
            return res.end();
        } else if(req.url.toLowerCase()==='/calculator-result' && req.method==='POST'){
            sumRequestHandler(req,res);
            return;
        }
    res.setHeader('Content-Type','text/html');
    res.write(`
        <html>
            <head><title>Practice Set</title></head>
            <body>
                <h1>404 Page Does Not Exist</h1>
                <a href="/">Go to Home</a>
            </body>
        </html>
        `);
    return res.end();
}

exports.requestHandler=requestHandler;