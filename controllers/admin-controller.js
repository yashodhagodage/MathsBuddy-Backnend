const bcrypt = require('bcryptjs/dist/bcrypt');
const Admin  = require('../models/Admin');
const jwt = require('jsonwebtoken');

//get all admins
const getAllAdmins = async (req, res, next) => {
    let admins;
    try{
        admins = await Admin.find()
    }catch(err){
        console.log(err);
    }
    if(!admins){
        return res.status(404).json({message:'No admins found'})
    }
    res.status(200).json({admins});
}

//get admin by id
const getAdminById = async (req, res, next) => {
    const id = req.params.id;
    let admin;
    try{
        admin = await Admin.findById(id)
    }catch(err){
        console.log(err);
    }
    if(!admin){
        return res.status(404).json({message:'Admin not found'})
    }
    res.status(200).json({admin});
}

//admin register
const register = async (req, res, next) => {
    // check if email already exists
    const emailExists = await Admin.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    //check if password is valid
    if(req.body.password.length < 6){
        return res.status(400).send('Password must be at least 6 characters long');
    }

 

    const {first_name, last_name, email, date_of_birth} = req.body;

       //HASHING PASSWORD
       const salt = await bcrypt.genSalt(10);
       const password = await bcrypt.hash(req.body.password, salt);
    let admin;
    let data;
    try{
        admin = new Admin({
            first_name,
            last_name,
            email,
            date_of_birth,
            password,
        });
        await admin.save();
        data = admin
}catch (err){
    console.log(err);
}
if(!admin){
    return res.status(404).json({message:'Admin Not added'})
}
console.log("admin added",admin);
//res.status(201).json({admin});

const admin1 = await Admin.findOne({email: req.body.email});//getting _id of the added admin
const token = jwt.sign({_id: admin1._id}, process.env.TOKEN_SECRET);//creating the token
res.header('token', token).status(200).send({status: 'SUCCESS',message:"Signup Successful",data,token });
}

//admin login
const login = async (req, res, next) => {
    //check if email exists
    const admin = await Admin.findOne({email: req.body.email});
    if (!admin) return res.status(400).send('Email or Password is wrong');

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!validPassword) return res.status(400).send(' Password is wrong');

    //creating and sending the token
    const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET);
    //res.header('token', token).send(admin._id);
    res.header('token', token).status(200).send({status: 'SUCCESS',message:"Signin Successful",data:admin,token });
    //console.log("JWT =",token);
}



//update admin
const updateAdmin =async (req, res, next) => {
    const id = req.params.id;
    const {first_name, last_name, email, date_of_birth, password} = req.body;
    let admin;
    try{
        admin = await Admin.findByIdAndUpdate(id, {
            first_name,
            last_name,
            email,
            date_of_birth,
            password,
           
    })
    admin = await admin.save()
    }catch(err){
    console.log(err);
        }
    if(!admin){
        return res.status(404).json({message:'Unable to update admins'})
        
        
    }
    console.log("admin updated",admin);
    return res.status(200).json({admin});
}

//delete admin
const deleteAdmin =async (req, res, next) => {
    const id = req.params.id;
    let admin;
    try{
        admin = await Admin.findByIdAndDelete(id);
    }catch(err){
    console.log(err);
        }
    if(!admin){
        return res.status(404).json({message:'Unable to delete admin'})

    }
    console.log("admin deleted",admin);
    return res.status(200).json({admin});
}



//export all the functions
// exports.register = register;
// exports.updateAdmin = updateAdmin;
// exports.deleteAdmin = deleteAdmin;
// exports.getAllAdmins = getAllAdmins;
// exports.login = login;
// exports.getAdminById = getAdminById;

module.exports = {
    register:register,
    updateAdmin : updateAdmin,
    deleteAdmin : deleteAdmin,
    getAllAdmins : getAllAdmins,
    login : login,
    getAdminById : getAdminById,
    
  }