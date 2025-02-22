import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../LIB/cloudinary.js";

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
                {sender:senderId,receiver:userToChatId},
                {sender:userToChatId,receiver:senderId}
            ]
        }).sort("createdAt");

        res.status(200).json(messages);

    }
    catch(error){
        console.log("Error in getMessagesBetweenTwoUsers:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const sendMessage=async(req,res)=>{
    try{
        const {text,image}=req.body;
        const senderId=req.user._id;
        const receiverId=req.params.id;

        let imageUrl;
        if(image)
        {
            const uploadResponse=await  cloudinary.uploader.upload(image,{
                upload_preset:"chatapp"
            });
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            sender:senderId,
            receiver:receiverId,
            text,
            image:imageUrl
        });

        await newMessage.save();
        res.status(201).json({message:"Message sent successfully !",newMessage});

        //todo :realtime functionality using socket.io
    }
    catch(error){
        console.log("Error in sendMessage:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};