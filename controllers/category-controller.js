const Question  = require('../models/Question');



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
    getCategories: getCategories
  }