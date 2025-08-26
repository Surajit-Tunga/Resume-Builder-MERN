import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//GENERATE JWT TOKEN
const generateToken = (userId) =>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

// REGISTER FUNCTION
export const registerUser = async(req, res) => {
    try{
        const {name, email, password}= req.body;

        // CHECK USER ALREADY EXIST OR NOT
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({message: "User Exist"});
        }
        // CHECK PASSWORD
        if(password.length < 8) {
            return res.status(400).json({success: false, message: "Pasword Mast be atleast 8 Characters."});
        }
        //HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        //CREATE USER
        const user = await User.create({
            name,
            email,
            password: hashedpassword,
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}
// LOGIN FUNCTION
export const loginUser = async(req, res)=>{
    try {
        const {email, password} =req.body;
        const user = await User.findOne({email});
        // CHECK THAT USER EXIST OR NOT
        if (!user){
            return res.status(500).json({message:"Invaild email or password"})
        }
        // CHECK THE PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(500).json({message:"Invaild email or password"});
        }
    } catch (error){
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

// GETUSER FUNCTION
export const getUserProfile = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(404).json({message: "User not Found"});
        }
        res.status(200).json(user);

    } catch (error){
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}