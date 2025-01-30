import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

 export const protectRoute = async (req, res, next) => {
    try {
        const tokenCheck = req.body.token
        // console.log("check token", tokenCheck);

        if (!tokenCheck) {
            return res.status(401).json({ msg: "Token is missing!" })
        }

        const decode = jwt.verify(tokenCheck, process.env.JWT_SECRET)
        if (!decode) return res.status(401).json({ msg: "Token is invalid!" })

        const user = await User.findById(decode.userId).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found!" })

        req.user = user
        next()
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        console.log(error);
    }
}