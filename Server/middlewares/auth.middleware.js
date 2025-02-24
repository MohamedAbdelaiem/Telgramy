import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { generateToken } from "../LIB/utils.js";


export const protect = async (req, res, next) => {
    try {
        // 1) Get the token and check if it's there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies.jwt) { 
            token = req.cookies.jwt;
        }
        if (!token) {
            return res.status(401).json({ message: "You are not logged in. Please log in to get access" });
        }
        // 2) Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 3) Check if the user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ message: "The user belonging to this token does no longer exist" });
        }
        // 4) Check if the user changed the password after the token was issued
        // if (User.changedPasswordAfter(decoded.iat)) {
        //     return res.status(401).json({ message: "User recently changed password! Please log in again" });
        // }
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();
    } catch (error) {
        console.log("Error in protect middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}