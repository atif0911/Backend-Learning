const fs=require('fs');
const path=require('path');
const rootDir=require('../utils/pathUtil');
const Favourite = require('./favourite');

//fake database
let registeredHomes=[];
const homeDataPath=path.join(rootDir,'data','homes.json');

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
            if(this.id){
                registeredHomes=registeredHomes.map(home=>{
                    if(home.id===this.id){
                        return this;
                    }
                    return home;
                })
            } else{
                this.id=Math.random().toString();
                registeredHomes.push(this);
            }
            fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),err=>{
                console.log("Writing file concluded",err);
            });
        });
    }

    static fetchAll(callback){
        fs.readFile(homeDataPath,(err,data)=>{
            if(!err){
                callback(JSON.parse(data));
            } else{
                callback([]);
            }
        })
    }

    static findById(homeId,callback){
        this.fetchAll(homes=>{
            const homeFound=homes.find(home=> home.id===homeId);
            callback(homeFound);
        })
    }

    static deleteById(homeId,callback){
        this.fetchAll(homes=>{
            homes=homes.filter(home=>home.id!==homeId)
            fs.writeFile(homeDataPath,JSON.stringify(homes),error=>{
                Favourite.deleteById(homeId,callback);
            });
        })
    }
}

