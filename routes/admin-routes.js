const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const Admin = require('../models/Admin');
const adminController = require('../controllers/admin-controller');



router.get('/',adminController.getAllAdmins)//get all users
router.post('/register',adminController.register);//create a new question
router.post('/login',adminController.login);//login
router.put('/:id',adminController.updateAdmin)//update user
router.delete('/delete/:id',adminController.deleteAdmin)//delete user
router.get('/:id',adminController.getAdminById)//get user by id







module.exports = router;
