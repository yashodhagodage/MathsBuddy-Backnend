const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const Question = require('../models/Question');
const questionController = require('../controllers/questions-controller');




//router.get('/',verify,booksController.getAllQuestions);
router.get('/',questionController.getCategories);//get all questions



module.exports = router;