import { log } from "console";
import User from "../model/User.model.js";
import crypto from "crypto"

const registerUser = async (req, res) => {
    // get data 
    // check if user already exists
    // create a user in database
    // create a verification token
    // save token in database
    // send token as email to user
    // send success status to user

    const {name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    // check validation

try {
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        })
    }


    const user = await User.create({
        name,
        email,
        password
    })


    if(!user){
        return res.status(400).json({
            message: "User not registered",
        })
    }

 const token = crypto.randomBytes(32).toString("hex")
 console.log(token);
 user.verificationToken = token

 await user.save()






} catch (error) {
    
}
    
}

export {registerUser}

