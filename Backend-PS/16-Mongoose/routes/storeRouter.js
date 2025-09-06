const express = require("express");
const storeRouter = express.Router();

const storeController=require('../controllers/store');

storeRouter.get("/",storeController.getHomes)
storeRouter.get("/homeList",storeController.getHomeList)
storeRouter.get("/booking",storeController.getBooking)
storeRouter.get("/favouriteList",storeController.getFavouriteList)
storeRouter.get("/reserve",storeController.getReserve)
storeRouter.get("/homes/:homeId",storeController.getHomeDetails)
storeRouter.post("/favouriteList",storeController.postFavouriteList)
storeRouter.post("/favourites/delete/:homeId",storeController.postRemoveFromFavourite)

module.exports = storeRouter;