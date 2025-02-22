import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import User from "../models/userModel.js";
import { generateToken } from "../LIB/utils.js";
import cloudinary from "../LIB/cloudinary.js";

export const signUp = async(req, res) => {
  const { email, password,fullName,profilePic } = req.body;
  try{
    //check some constraints
    if(!email || !password || !fullName){
      return res.status(400).json({message:"Please fill all the fields"});
    };
    if(password.length < 6){
      return res.status(400).json({message:"Password must be at least 6 characters long"});
    };

    //check if the user already exists
    const user= await User.findOne({email});
    if(user){
      return res.status(400).json({message:"User already exists"});
    };

    //hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //save the user
    const newUser = new User({
      email,
      password:hashedPassword,
      fullName,
      profilePic
    });

    if(newUser)
    {
      //generate token
      const token = generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({message:"User created successfully", token,user:{
        id:newUser._id,
        email:newUser.email,
        fullName:newUser.fullName,
        profilePic:newUser.profilePic
      }});
    }
    else{
      return res.status(500).json({message:"Failed to create user"});
    }

  }
  catch(error){
    res.status(500).json({message:"Internal Server Error"});
    console.log("Error in signUp:",error);
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if the user exists (MISSING AWAIT FIXED)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid password or email" });
    }

    // Check if the password is correct
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password or email" });
    }

    // Generate token
    const token = generateToken(user._id, res);
    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in logIn:", err);
  }
};


export const logOut = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({message:"Logged out successfully"});
};

export const updateProfile = async (req, res) => {
  const { fullName, profilePic, oldpassword, newpassword, email } = req.body;
  
  try {
    // 1️⃣ Find the user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updates = {};

    // 2️⃣ Update fullName if provided
    if (fullName) updates.fullName = fullName;

    // 3️⃣ Handle password update
    if (oldpassword) {
      if (!newpassword) {
        return res.status(400).json({ message: "Please provide a new password" });
      }
      if (newpassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long" });
      }
      
      // Check if the old password is correct
      const isMatch = await bcryptjs.compare(oldpassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      // Hash new password
      updates.password = await bcryptjs.hash(newpassword, 10);
    }

    // 4️⃣ Handle email update
    if (email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
      updates.email = email;
    }

    // 5️⃣ Handle profile picture update (delete old image first)
    if (profilePic) {
      if (user.profilePic) {
        // Extract the Cloudinary public ID from the URL
        const publicId = user.profilePic.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      
      const uploadedImage = await cloudinary.uploader.upload(profilePic);
      updates.profilePic = uploadedImage.secure_url;
    }

    // 6️⃣ Check if any updates exist
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Please provide at least one field to update" });
    }

    // 7️⃣ Update the user document
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true });

    // 8️⃣ Respond with updated user details
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        profilePic: updatedUser.profilePic,
      },
    });

  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

