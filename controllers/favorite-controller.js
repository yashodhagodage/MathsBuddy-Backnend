const Favorite = require('../models/Favorite');


//add a favorite
const addFavorite = async (req, res, next) => {
    const {user_id, question_id} = req.body;
    let newfavorite;
    try{
        newfavorite = new Favorite({
            user_id,
            question_id,
        });
        await newfavorite.save();
}catch (err){
    console.log(err);
}
if(!newfavorite){
    return res.status(404).json({message:'Favorite not added'})
}
res.status(201).json({newfavorite});
}


//get all favorites
const getAllFavorites = async (req, res, next) => {
    let favorites;
    try{
        favorites = await Favorite.find()
    }catch(err){
        console.log(err);
    }
    if(!favorites){
        return res.status(404).json({message:'No favorites found'})
    }
    res.status(200).json({favorites});
}



//find a favorite by id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let favorite;
    try{
        favorite = await Favorite.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!favorite){
        return res.status(404).json({message:'Favorite not found'})
        console.log("favorite not found");
    }
    return res.status(200).json({favorite});
}


//find a favorites by user id
const getByUser = async (req, res, next) => {
    const user = req.params.user_id;
    let favorite;
    try{
        favorite = await Favorite.find({user_id: user});
    }catch(err){
        console.log(err);
    }

    if(!favorite){
        return res.status(404).json({message:'Favorite not found'})
        console.log("favorite not found");
    }
    return res.status(200).json({favorite});
}


//delete a favorite
const deleteFavorite = async (req, res, next) => {
    const id = req.params.id;
    let favorite;
    try {
      favorite = await Favorite.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
    if (!favorite) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Product Successfully Deleted" });
  };


// exports.getAllFavorites = getAllFavorites;
// exports.addFavorite = addFavorite;
// exports.getById = getById;
// exports.deleteFavorite = deleteFavorite;
// exports. = getByUser;

module.exports = {
    getAllFavorites:getAllFavorites,
    addFavorite : addFavorite,
    getById : getById,
    deleteFavorite : deleteFavorite,
    getByUser : getByUser,
    
  }