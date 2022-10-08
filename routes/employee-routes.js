const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const Employee = require('../models/Employee');
const employeeController = require('../controllers/employee-controller');



router.get('/',employeeController.getAllEmployees)//get all users
router.post('/register',employeeController.register);//create a new question
router.post('/login',employeeController.login);//login
router.put('/:id',employeeController.updateEmployee)//update user
router.delete('/delete/:id',employeeController.deleteEmployee)//delete user
router.get('/:id',employeeController.getEmployeeById)//get user by id







module.exports = router;
