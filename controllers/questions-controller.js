const Question  = require('../models/Question');


//add a question
const addQuestion = async (req, res, next) => {
    const {category, question, answer, sample_answers, guide} = req.body;
    let newquestion;
    try{
        newquestion = new Question({
            category,
            question,
            answer,
            sample_answers,
            guide,
        });
        await newquestion.save();
}catch (err){
    console.log(err);
}
if(!newquestion){
    return res.status(404).json({message:'Question not added'})
}
res.status(201).json({newquestion});
}


//get all questions
const getAllQuestions = async (req, res, next) => {
    let questions;
    try{
        questions = await Question.find()
    }catch(err){
        console.log(err);
    }
    if(!questions){
        return res.status(404).json({message:'No questions found'})
    }
    res.status(200).json({questions});
}

const getLessQuestions = async (req, res, next) => {
    let questions;
    try{
        questions = await Question.find().limit(3).skip(1);
    }catch(err){
        console.log(err);
    }
    if(!questions){
        return res.status(404).json({message:'No questions found'})
    }
    res.status(200).json({questions});
}



//find a question by id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let question;
    try{
        question = await Question.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!question){
        return res.status(404).json({message:'Question not found'})
        console.log("question not found");
    }
    return res.status(200).json({question});
}


//find a question by category
const getByCategory = async (req, res, next) => {
    const category = req.params.category;
    let question;
    try{
        console.log(category);
        question = await Question.find({category: category});
    }catch(err){
        console.log(err);
    }

    if(!question){
        return res.status(404).json({message:'Question not found'})
        console.log("question not found");
    }
    return res.status(200).json({question});
}



//update a question
const updateQuestion =async (req, res, next) => {
    const id = req.params.id;
    const {category, question, answer, sample_answers, guide} = req.body;
    let updatedquestion;
    try{
        updatedquestion = await Question.findByIdAndUpdate(id, {
            category,
            question,
            answer,
            sample_answers,
            guide,
           
    })
    updatedquestion = await updatedquestion.save()
    }catch(err){
    console.log(err);
        }
    if(!updatedquestion){
        return res.status(404).json({message:'Unable to update question'})
        
        
    }
    return res.status(200).json({updatedquestion});
}

//delete a question
const deleteQuestion = async (req, res, next) => {
    const id = req.params.id;
    let question;
    try {
      question = await Question.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
    if (!question) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Product Successfully Deleted" });
  };

//get all categories in questions
const getCategories = async (req, res, next) => {
    let categories;
    try{
        categories = await Question.distinct('category');
    }catch(err){
        console.log(err);
    }
    if(!categories){
        return res.status(404).json({message:'No categories found'})
    }
    res.status(200).json({categories});
}



// exports.getAllQuestions = getAllQuestions;
// exports.addQuestion = addQuestion;
// exports.getById = getById;
// exports.updateQuestion = updateQuestion;
// exports.deleteQuestion = deleteQuestion;
// exports.getLessQuestions = getLessQuestions;
// exports.getByCategory = getByCategory;

module.exports = {
    getAllQuestions:getAllQuestions,
    addQuestion : addQuestion,
    getById : getById,
    updateQuestion : updateQuestion,
    deleteQuestion : deleteQuestion,
    getLessQuestions : getLessQuestions,
    getByCategory : getByCategory,
    getCategories: getCategories
    
  }