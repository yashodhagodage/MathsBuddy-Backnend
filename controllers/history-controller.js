const History  = require('../models/History');


//add a history
const addHistory = async (req, res, next) => {
    const {user_id, question_category, marks} = req.body;
    let newhistory;
    try{
        newhistory = new History({
            user_id,
            question_category,
            marks,
        });
        await newhistory.save();
}catch (err){
    console.log(err);
}
if(!newhistory){
    return res.status(404).json({message:'History not added'})
}
res.status(201).json({newhistory});
}


//get all histories
const getAllHistorys = async (req, res, next) => {
    let histories;
    try{
        histories = await History.find()
    }catch(err){
        console.log(err);
    }
    if(!histories){
        return res.status(404).json({message:'No histories found'})
    }
    res.status(200).json({histories});
}



//find a history by id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let history;
    try{
        history = await History.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!history){
        return res.status(404).json({message:'History not found'})
        console.log("history not found");
    }
    return res.status(200).json({history});
}


//find a histories by user id
const getByUser = async (req, res, next) => {
    const user = req.params.user_id;
    let history;
    try{
        history = await History.find({user_id: user});
    }catch(err){
        console.log(err);
    }

    if(!history){
        return res.status(404).json({message:'History not found'})
        console.log("history not found");
    }
    return res.status(200).json({history});
}


//delete a history
const deleteHistory = async (req, res, next) => {
    const id = req.params.id;
    let history;
    try {
      history = await History.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
    if (!history) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Product Successfully Deleted" });
  };


// exports.getAllHistorys = getAllHistorys;
// exports.addHistory = addHistory;
// exports.getById = getById;
// exports.deleteHistory = deleteHistory;
// exports.getByUser = getByUser;

module.exports = {
    getAllHistorys:getAllHistorys,
    addHistory : addHistory,
    getById : getById,
    deleteHistory : deleteHistory,
    getByUser : getByUser,
    
  }