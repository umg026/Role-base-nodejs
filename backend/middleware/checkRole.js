import User from '../models/userModel.js';

export const checkRole = (role) => {
    return async (req, res, next) => {
        try {
            // Fetch user details based on userID (set by verifyToken)
            const user = await User.findById(req.userID).populate('role'); // Assuming user has a reference to role

            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            if (user.role.roleType !== role) {
                return res.status(403).json({ msg: "Access denied, insufficient permissions" });
            }

            next();
        } catch (error) {
            console.error("Error checking role:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };
};
