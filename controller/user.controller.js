import { log } from "console";
import User from "../model/User.model.js"
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  // get data
  // check if user already exists
  // create a user in database
  // create a verification token
  // save token in database
  // send token as email to user
  // send success status to user

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  // check validation

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(user);
    

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }
    
    // create token by crypto
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    user.verificationToken = token;

    await user.save();

    // send email
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });


    const mailOption = {
        from: process.env.MAILTRAP_SENDERMAIL,
        to: user.email,
        subject: "Verify your emil", // Subject line
        text: `Please click on the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
        // html: "<b>Hello world?</b>", // html body
    };

    await transporter.sendMail(mailOption)

    res.status(201).json({
        message: "User registered successfully",
        success: true
    })


  } catch (error) {
    res.status(400).json({
        message: "User not registered",
        error,
        success: false,
    });

  }
};


const verifyUser = async (req, res) => {

    // get token from url
    // validate
    // find user based on token
    // if not
    // set isVerified field to true
    // save
    // return response

    const {token} = req.params;
    console.log(token);
    if(!token){
        return res.status(400).json({
            message: "Invalid token"
        })
    }


    const user = await User.findOne({verificationToken: token})
    if(!user){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    user.isVerified = true
    user.verificationToken = undefined
    await user.save()


};


const login = async (req, res) => {

  const {email, password} = req.body

  if(!email || !password){
  return res.status(400).json({
      message: "All fields are required"
    })
  }
  

  try{
    const user = await User.findOne({email})
    console.log("hey")
    if(!user){
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    
    
    }catch(error){
    
    }
}





export { registerUser };
