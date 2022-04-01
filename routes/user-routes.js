const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/users-controller');



router.get('/',userController.getAllUsers)//get all users
router.post('/register',userController.register);//create a new question
router.post('/login',userController.login);//login
router.put('/:id',userController.updateUser)//update user
router.delete('/delete/:id',userController.deleteUser)//delete user
router.get('/:id',userController.getUserById)//get user by id







module.exports = router;
