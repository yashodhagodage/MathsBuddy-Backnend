const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const History = require('../models/History');
const historyController = require('../controllers/history-controller');



router.get('/',historyController.getAllHistorys)//get all histories <of all users>
router.post('/add',historyController.addHistory);//Add a new item to history
router.get('/byid/:id',historyController.getById);//Get history record by _id
router.get('/byuser/:user_id',historyController.getByUser);//get history records of a user <by user id>
router.delete('/delete/:id',historyController.deleteHistory)//delete history record







module.exports = router;
