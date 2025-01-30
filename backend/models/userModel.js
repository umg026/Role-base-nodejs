import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: false,
        default: 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema);

export default User;