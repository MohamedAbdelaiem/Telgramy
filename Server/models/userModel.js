import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false,
        minlength: 6
    },
    profilePic:{
        type: String,
        default: ''
    }
},{
    timestamps: true,
    passwordChangedAt: Date
});

const User = mongoose.model('User', userSchema);

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

export default User;