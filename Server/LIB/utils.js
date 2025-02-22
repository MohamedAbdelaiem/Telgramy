import jwt from "jsonwebtoken";
export const generateToken=(id,res)=>{
    const token=jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });

    res.cookie("jwt",token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true, //prevent XSS attack
        sameSite:"strict",
        secure:process.env.NODE_ENV==="production"?true:false
    });
    return token;
}