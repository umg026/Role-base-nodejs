import MySqlPool from '../config/db.js';

async function create(roleType, slug, permissions) {
    try {
        const [result] = await MySqlPool.query(`INSERT INTO roles (roleType, slug, permissions) VALUES (?, ?, ?)`, [roleType, slug, JSON.stringify(permissions)]);
        return result;
    } 
    catch (error) {
        console.log("Error in create role: ", error);
    }
}

async function deleterole(id) {
    try {
        const [result] = await MySqlPool.query(`DELETE FROM roles WHERE id = ?`, [id]);
        return result;
    } 
    catch (error) {
        console.log("Error in create role: ", error);
    }
}

async function update(roleType,permissions, params) {
    try {
        const [result] = await MySqlPool.query(`UPDATE roles SET roleType = ?, permissions = ? WHERE slug = ?`, [roleType, JSON.stringify(permissions), params.slug]);

        return result;
    } 
    catch (error) {
        console.log("Error in create role: ", error);
    }
}

export async function findRoleByType(roleType) {
    try {
        const [result] = await MySqlPool.query(
            `SELECT * FROM roles WHERE roleType = ? LIMIT 1`, 
            [roleType]
        );
        return result.length ? result[0] : null;
    } catch (error) {
        console.error("Error in finding role by type: ", error);
    }
}
