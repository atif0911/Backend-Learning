const express = require('express');
const hostRouter=express.Router();

const hostController=require('../controllers/host');

hostRouter.get('/add-home', hostController.getAddHome);
hostRouter.post('/add-home',hostController.postAddHome);
hostRouter.get('/hostHomeList',hostController.getHostHomes);

exports.hostRouter = hostRouter;