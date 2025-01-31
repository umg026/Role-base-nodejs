import MySqlPool from '../config/db.js';
import Role from '../models/roleModel.js';
import genrateSlug from '../service/genrateSlug.js';

async function createRole(req, res) {
    try {
        let slug;
        const roleTypequery = req.query.roleTypequery;

        const { roleType, permissions } = req.body;

        if (!roleType) return res.status(400).json({ msg: "Role type is required" });

        if (roleTypequery == 'Admin') {

            slug = genrateSlug(roleType); // ganrate slug

            const result = await Role.create(roleType, slug, permissions);
            
            if (result.affectedRows > 0) {
                return res.status(201).json({ message: "Role created successfully" });
            }
        }
        else {
            res.status(400).json({ message: "Unauthorized access" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

async function deleteRole(req, res) {
    try {
        const roleTypequery = req.query.roleTypequery;
        const slug = req.params.slug;
        // console.log("slug", slug, "Query: ", roleTypequery);

        if (!slug) return res.status(400).json({ msg: "Please provide all fields" });

        if (roleTypequery == 'Admin') {
            const [result] = await MySqlPool.query(`DELETE FROM roles WHERE slug = ?`, [slug])

            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "Role deleted successfully!" });
            } else {
                return res.status(404).json({ message: "Role not found!" });
            }
        }
        else {
            res.status(400).json({ message: "Unauthorized access" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

async function updateRole(req, res) {
    try {
        const params = req.params;
        console.log("params in update role", params);

        const { roleType, permissions } = req.body;
        if (!roleType) return res.status(400).json({ msg: "Please provide all fields" });
       
       const result = await Role.update(roleType, permissions, params);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Role updated successfully!" });
        } else {
            return res.status(404).json({ message: "Role not found!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export { createRole, deleteRole, updateRole };