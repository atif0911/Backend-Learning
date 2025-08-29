const fs =require('fs');

console.log("1. Start of script");

console.log("2. Reading file synchronously");
const dataSync=fs.readFileSync('file.txt','utf-8');
console.log("3. File content (sync): ",dataSync);

console.log("4. Reading file asynchronously");
fs.readFile('file.txt','utf-8',(err, dataAsync)=>{
    if(err){
        console.error("Error reading file asynchronously:", err);
    } else {
        console.log("5. File content (async): ",dataAsync);
    }
});

console.log("6. End of script");