const fs=require('fs');
const path=require('path');
const rootDir=require('../utils/pathUtil');

//fake database
let registeredHomes=[];

module.exports =class Home{
    constructor(houseName,pricePerNight, location,rating,photo){
        this.houseName=houseName;
        this.pricePerNight=pricePerNight;
        this.location=location;
        this.rating=rating;
        this.photo=photo;
    }

    save(){
        Home.fetchAll(registeredHomes=>{
            registeredHomes.push(this);
            const homeDataPath=path.join(rootDir,'data','homes.json');
            fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),err=>{
                console.log("Writing file concluded",err);
            });
        });
    }

    static fetchAll(callback){
        const homeDataPath=path.join(rootDir,'data','homes.json');
        fs.readFile(homeDataPath,(err,data)=>{
            if(!err){
                callback(JSON.parse(data));
            } else{
                callback([]);
            }
        })
    }
}

