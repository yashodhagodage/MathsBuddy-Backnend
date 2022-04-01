const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const Question = require('../models/Question');
const questionController = require('../controllers/questions-controller');




//router.get('/',verify,booksController.getAllQuestions);
router.get('/',questionController.getAllQuestions);//get all questions
router.get('/less',questionController.getLessQuestions);//get 3 random questions
router.post('/create',questionController.addQuestion);//create a new question
router.get('/:id',questionController.getById);//get question by id
router.put('/:id',questionController.updateQuestion);//update question by id
router.delete('/:id',questionController.deleteQuestion);//delete question by id
router.get('/getcategory/:category',questionController.getByCategory);//get  by category
router.get('/categories',questionController.getCategories);//get all questions



module.exports = router;