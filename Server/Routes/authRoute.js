import express from "express";

const AuthRoute = express.Router();
import { signUp, logIn, logOut,updateProfile } from "../controllers/AuthController.js";
import { protect } from "../middlewares/auth.middleware.js";

AuthRoute.post("/signup",signUp)
AuthRoute.post("/login",logIn);
AuthRoute.post("/logout", logOut);

AuthRoute.patch("/update-profile",protect,updateProfile);






export default AuthRoute;