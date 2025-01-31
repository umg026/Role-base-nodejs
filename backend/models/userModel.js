import MySqlPool from '../config/db.js';

async function findUserByEmail(email) {
    try {
        const [rows] = await MySqlPool.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return rows.length > 0 ? rows[0] : null;
    } 
    catch (error) {
        console.error("Error finding user by email:", error);
        throw error;
    }
}

async function createUser(fullname, email, hashedPassword, roleId, profilePic) {
    try {
        const [result] = await MySqlPool.query(
            `INSERT INTO users (fullname, email, password, role_id, profilePic) VALUES (?, ?, ?, ?, ?)`,
            [fullname, email, hashedPassword, roleId, profilePic]
        );
        return result;
    } 
    catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

async function updateUser(userId, fullname, email, profilePic) {
    try {
        const [result] = await MySqlPool.query(
            `UPDATE users SET fullname = ?, email = ?, profilePic = ? WHERE id = ?`,
            [fullname, email, profilePic, userId]
        );
        return result;
    } 
    catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export { findUserByEmail, createUser, updateUser };
