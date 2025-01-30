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
            console.log("uniques slug in createRole", slug);
            

            const role = await Role.create({ roleType, slug, permissions });
            if (role) {
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
        console.log("slug", slug, "Query: ",roleTypequery);
        

        if (!slug) return res.status(400).json({ msg: "Please provide all fields" });

        if (roleTypequery == 'Admin') {
          const response = await Role.findOneAndDelete({ slug });
          res.status(200).json({ message: "Role deleted successfully!" });

          console.log("res", response);
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
      
      const {roleType, permissions} = req.body;
      if (!roleType) return res.status(400).json({ msg: "Please provide all fields" });
      await Role.findOneAndUpdate({slug: params.slug}, {roleType, permissions});
    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export { createRole, deleteRole, updateRole };