const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../models/user")



const registerUser = async (req, res) => {

    const {userName, email, password} = req.body;
    console.log(req.body)

    try {
        
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password : hashPassword,
        })

        await newUser.save();
        res.status(200).json({
            success : true,
            message : "Registration successful"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some error occured."
        })
    }
}




const LoginUser = async (req, res) => {
    const {email, password} = req.body;

    try {


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some error occured."
        })
    }
}

module.exports = { registerUser };