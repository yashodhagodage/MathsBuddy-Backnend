const bcrypt = require('bcryptjs/dist/bcrypt');
const User  = require('../models/User');
const jwt = require('jsonwebtoken');

//get all users
const getAllUsers = async (req, res, next) => {
    let users;
    try{
        users = await User.find()
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:'No users found'})
    }
    res.status(200).json({users});
}

//get user by id
const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try{
        user = await User.findById(id)
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:'User not found'})
    }
    res.status(200).json({user});
}

//user register
const register = async (req, res, next) => {
    // check if email already exists
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    //check if password is valid
    if(req.body.password.length < 6){
        return res.status(400).send('Password must be at least 6 characters long');
    }

 

    const {first_name, last_name, email, date_of_birth} = req.body;

       //HASHING PASSWORD
       const salt = await bcrypt.genSalt(10);
       const password = await bcrypt.hash(req.body.password, salt);
    let user;
    let data;
    try{
        user = new User({
            first_name,
            last_name,
            email,
            date_of_birth,
            password,
        });
        await user.save();
        data = user
}catch (err){
    console.log(err);
}
if(!user){
    return res.status(404).json({message:'User Not added'})
}
console.log("user added",user);
//res.status(201).json({user});

const user1 = await User.findOne({email: req.body.email});//getting _id of the added user
const token = jwt.sign({_id: user1._id}, process.env.TOKEN_SECRET);//creating the token
res.header('token', token).status(200).send({status: 'SUCCESS',message:"Signup Successful",data:[user],token });
}

//user login
const login = async (req, res, next) => {
    //check if email exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or Password is wrong');

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send(' Password is wrong');

    //creating and sending the token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    //res.header('token', token).send(user._id);
    res.header('token', token).status(200).send({status: 'SUCCESS',message:"Signin Successful",data:[user],token });
    //console.log("JWT =",token);
}



//update user
const updateUser =async (req, res, next) => {
    const id = req.params.id;
    const {first_name, last_name, email, date_of_birth, password} = req.body;
    let user;
    try{
        user = await User.findByIdAndUpdate(id, {
            first_name,
            last_name,
            email,
            date_of_birth,
            password,
           
    })
    user = await user.save()
    }catch(err){
    console.log(err);
        }
    if(!user){
        return res.status(404).json({message:'Unable to update users'})
        
        
    }
    console.log("user updated",user);
    return res.status(200).json({user});
}

//delete user
const deleteUser =async (req, res, next) => {
    const id = req.params.id;
    let user;
    try{
        user = await User.findByIdAndDelete(id);
    }catch(err){
    console.log(err);
        }
    if(!user){
        return res.status(404).json({message:'Unable to delete user'})

    }
    console.log("user deleted",user);
    return res.status(200).json({user});
}



//export all the functions
// exports.register = register;
// exports.updateUser = updateUser;
// exports.deleteUser = deleteUser;
// exports.getAllUsers = getAllUsers;
// exports.login = login;
// exports.getUserById = getUserById;

module.exports = {
    register:register,
    deleteUser : deleteUser,
    getAllUsers : getAllUsers,
    login : login,
    getUserById : getUserById,
    updateUser : updateUser
    
  }