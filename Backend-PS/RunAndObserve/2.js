console.log("1. Start of script");

Promise.resolve().then(()=> console.log("2. First Microtask"));

setTimeout(()=> console.log("3. First Timer"),0);

const fs=require('fs');
fs.readFile('file.txt',()=>console.log("4. I/O Operation"));

setImmediate(()=> console.log("5. Immediate Timer"));

process.on("exit",(code)=>{
    console.log("6. Exit event with code:",code);
})
console.log("7. End of script");