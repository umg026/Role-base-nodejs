import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import { genrateToken } from '../service/jwt.js';
import Role from '../models/roleModel.js';

const handelUserSignup = async (req, res) => {
    try {
        const { fullname, email, password, roleType, profilePic } = req.body;
        
        if (!fullname || !email || !password || !roleType) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'passowrd must be 6 letter!' })
        }
        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: 'Email already exists!' })
        const role = await Role.findOne ({ roleType });
        // console.log("role", role);
    

        if (!role) {
            return res.status(400).json({ message: 'Role not found!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            email,
            role: role._id,
            password: hashedPassword,
        });

        if (newUser) {
            await newUser.save();

            res.status(201).json({
                "msg" : "User signup in successfully",
                newUser
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const handelUserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ msg: "Failed to authenticate" });
        }
        req.user = user;
        // console.log("user details", user, "req.user:",req.user);
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

      const token = genrateToken(user._id, user.role, res);
        return res.status(200).json({
             message: 'Login success',
             token ,
             user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const handelUserUpdate = async (req, res) => {
    try {
        const userId = req.params.id;
        const { fullname, email, profilePic } = req.body;
        
        let updateFields = {};
        if (fullname) updateFields.fullname = fullname; 
        if (email) updateFields.email = email;  
        if (profilePic) updateFields.profilePic = profilePic;
        
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json({
            msg: "User updated successfully",
            updatedUser,
        });
    } 
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


export { handelUserLogin, handelUserSignup, handelUserUpdate };
