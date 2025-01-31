import bcrypt from 'bcryptjs';
import { genrateToken } from '../service/jwt.js';
import { findUserByEmail, createUser, updateUser } from '../models/userModel.js';
import { findRoleByType } from '../models/roleModel.js';

async function handelUserSignup(req, res) {
    try {
        const { fullname, email, password, roleType, profilePic } = req.body;

        if (!fullname || !email || !password || !roleType) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await findUserByEmail(email);
        if (user) return res.status(400).json({ message: "Email already exists!" });

        const role = await findRoleByType(roleType);
        if (!role) return res.status(400).json({ message: "Role not found!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(fullname, email, hashedPassword, role.id, profilePic);

        if (newUser) {
            return res.status(201).json({ message: "User signed up successfully", newUser });
        } 
        else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function handelUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = genrateToken(user.id, user.role_id, res);

        return res.status(200).json({
            message: "Login success",
            token,
            user
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function handelUserUpdate(req, res) {
    try {
        const userId = req.params.id;
        const { fullname, email, profilePic } = req.body;

        const updatedUser = await updateUser(userId, fullname, email, profilePic);
        if (updatedUser.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully" });
    } 
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { handelUserSignup, handelUserLogin, handelUserUpdate };
