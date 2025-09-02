const fs=require('fs');
const path=require('path');
const rootDir=require('../utils/pathUtil');

const favouriteDataPath=path.join(rootDir, "data", "favourite.json");

//fake database
let registeredHomes=[];

module.exports =class Favourite{
    static addToFavourite(homeId, callback){
        Favourite.getFavourite(favourites=>{
            if(favourites.includes(homeId)){
                callback("Home is already marked Favourite")
            } else{
                favourites.push(homeId);            
                fs.writeFile(favouriteDataPath,JSON.stringify(favourites),callback);
            }
        });
    }

    static getFavourite(callback){
        fs.readFile(favouriteDataPath, (err, data)=>{
            callback(!err ? JSON.parse(data):[])
        })
    }

    static deleteById(delHomeId,callback){
        Favourite.getFavourite(homeIds=>{
            homeIds=homeIds.filter(homeId=>delHomeId!==homeId)
            fs.writeFile(favouriteDataPath,JSON.stringify(homeIds),callback);
        })
    }
}

