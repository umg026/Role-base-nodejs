import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const genrateToken = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })

    return token;
}

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ msg: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decoded.userID;
        next();
    }
    catch (error) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
}