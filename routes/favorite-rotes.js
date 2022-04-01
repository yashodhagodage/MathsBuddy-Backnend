const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const Favorite = require('../models/Favorite');
const favoriteController = require('../controllers/favorite-controller');



router.get('/',favoriteController.getAllFavorites)//get all favorites <of all users>
router.post('/add',favoriteController.addFavorite);//Add a new item to favorite
router.get('/byid/:id',favoriteController.getById);//Get favorite record by _id
router.get('/byuser/:user_id',favoriteController.getByUser);//get favorite records of a user <by user id>
router.delete('/delete/:id',favoriteController.deleteFavorite)//delete favorite record







module.exports = router;
