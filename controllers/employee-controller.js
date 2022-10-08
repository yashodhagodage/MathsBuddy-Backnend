const bcrypt = require('bcryptjs/dist/bcrypt');
const Employee  = require('../models/Employee');
const jwt = require('jsonwebtoken');

//get all employees
const getAllEmployees = async (req, res, next) => {
    let employees;
    try{
        employees = await Employee.find()
    }catch(err){
        console.log(err);
    }
    if(!employees){
        return res.status(404).json({message:'No employees found'})
    }
    res.status(200).json({employees});
}

//get employees by id
const getEmployeeById = async (req, res, next) => {
    const id = req.params.id;
    let employee;
    try{
        employee = await Employee.findById(id)
    }catch(err){
        console.log(err);
    }
    if(!employee){
        return res.status(404).json({message:'Employee not found'})
    }
    res.status(200).json({employee});
}

//employee register
const register = async (req, res, next) => {
    // check if email already exists
    const emailExists = await Employee.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    //check if password is valid
    if(req.body.password.length < 6){
        return res.status(400).send('Password must be at least 6 characters long');
    }

 

    const {first_name, last_name, email, date_of_birth} = req.body;

       //HASHING PASSWORD
       const salt = await bcrypt.genSalt(10);
       const password = await bcrypt.hash(req.body.password, salt);
    let employee;
    let data;
    try{
        employee = new Employee({
            first_name,
            last_name,
            email,
            date_of_birth,
            password,
        });
        await employee.save();
        data = employee
}catch (err){
    console.log(err);
}
if(!employee){
    return res.status(404).json({message:'Employee Not added'})
}
console.log("employee added",employee);
//res.status(201).json({employee});

const employee = await Employee.findOne({email: req.body.email});//getting _id of the added employee
const token = jwt.sign({_id: employee1._id}, process.env.TOKEN_SECRET);//creating the token
res.header('token', token).status(200).send({status: 'SUCCESS',message:"Signup Successful",data,token });
}

//employee login
const login = async (req, res, next) => {
    //check if email exists
    const employee = await Employee.findOne({email: req.body.email});
    if (!employee) return res.status(400).send('Email or Password is wrong');

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, employee.password);
    if (!validPassword) return res.status(400).send(' Password is wrong');

    //creating and sending the token
    const token = jwt.sign({_id: employee._id}, process.env.TOKEN_SECRET);
    //res.header('token', token).send(employee._id);
    res.header('token', token).status(200).send({status: 'SUCCESS',message:"Signin Successful",data:employee,token });
    //console.log("JWT =",token);
}



//update employee
const updateEmployee =async (req, res, next) => {
    const id = req.params.id;
    const {first_name, last_name, email, date_of_birth, password} = req.body;
    let employee;
    try{
        employee = await Employee.findByIdAndUpdate(id, {
            first_name,
            last_name,
            email,
            date_of_birth,
            password,
           
    })
    employee = await employee.save()
    }catch(err){
    console.log(err);
        }
    if(!employee){
        return res.status(404).json({message:'Unable to update employees'})
        
        
    }
    console.log("employee updated",employee);
    return res.status(200).json({employee});
}

//delete employee
const deleteEmployee =async (req, res, next) => {
    const id = req.params.id;
    let employee;
    try{
        employee = await Employee.findByIdAndDelete(id);
    }catch(err){
    console.log(err);
        }
    if(!employee){
        return res.status(404).json({message:'Unable to delete employee'})

    }
    console.log("employee deleted",employee);
    return res.status(200).json({employee});
}



module.exports = {
    register:register,
    updateEmployee : updateEmployee,
    deleteEmployee : deleteEmployee,
    getAllEmployees : getAllEmployees,
    login : login,
    getEmployeeById : getEmployeeById,
    
  }
