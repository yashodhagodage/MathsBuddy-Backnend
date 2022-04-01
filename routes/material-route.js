const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const Material = require('../models/Material');
const materialController = require('../controllers/material-controller');



router.get('/',materialController.getAllMaterials)//get all histories <of all users>
router.post('/add',materialController.addMaterial);//Add a new item to history
router.put('/:id',materialController.updateMaterial);//Update Material by Id
router.get('/byid/:id',materialController.getById);//Get history record by _id
router.get('/bycategory/:category',materialController.getByCategory);//get history records of a user <by user id>
router.delete('/delete/:id',materialController.deleteMaterial)//delete history record







module.exports = router;
