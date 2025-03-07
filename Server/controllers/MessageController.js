import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../LIB/cloudinary.js";



import { getRecieverSocketId, io } from "../LIB/socket.js";

import mongoose from "mongoose";
const ObjectID = mongoose.Types.ObjectId;

import crypto from 'crypto';

// Convert image file to hash (SHA-256)
const generateImageHash = async (image) => {
    const buffer = Buffer.from(image, "base64"); // Convert Base64 string to Buffer
    return crypto.createHash("sha256").update(buffer).digest("hex");
};

// Check if the image already exists in the database before uploading
const processImageUpload = async (image) => {
  const imageHash = await generateImageHash(image);

  // Check your database for the existing hash
  const existingImage = await findImageByHash(imageHash); // Your DB lookup function

  if (existingImage) {
    return {imageUrl:existingImage.Image,ImageHash:imageHash};
  } else {
    // Upload to Cloudinary
    const publicId = `chat_images/${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const uploadResponse = await cloudinary.uploader.upload(image, { public_id: publicId });

    return {imageUrl:uploadResponse.secure_url,ImageHash:imageHash};
  }
};

//find for a hash in the database
const findImageByHash = async (imageHash) => {
    return await Message.findOne({
        ImageHash: imageHash
    });
};





export const getUsersofsidebar=async(req,res)=>{
    try{
        const users=await User.find({_id:{
            $ne:req.user._id
        }}).select("-password");
        res.status(200).json(users);
    }
    catch(error){
        console.log("Error in getUsersofsidebar:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const getMessagesBetweenTwoUsers=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:senderId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:senderId}
            ]
        }).sort("createdAt");

        res.status(200).json(messages);

    }
    catch(error){
        console.log("Error in getMessagesBetweenTwoUsers:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid receiver ID" });
        }

        if ((!text || text.trim() === "") && !image) {
            return res.status(400).json({ message: "Please provide text or image" });
        }
        

        const receiverId = new mongoose.Types.ObjectId(String(id));

        let imageUrl = null;
        let imageHash = null;

        if (image) {
            const result = await processImageUpload(image);
            imageUrl = result.imageUrl;
            imageHash = result.ImageHash;
        }


        console.log("imageUrl:", imageUrl);

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            text,
            Image: imageUrl,
            ImageHash: imageHash
        });

        await newMessage.save();

        const receiverSocketId = getRecieverSocketId(id);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        
        res.status(201).json({ message: "Message sent successfully!", newMessage });

    } catch (error) {
        console.log("Error in sendMessage:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};