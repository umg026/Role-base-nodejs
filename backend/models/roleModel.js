import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    roleType: {
        type: String,
        required: true
    },
    slug : {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: Array,
        required: false
    }
 }, { timestamps: true });

const Role = mongoose.model("Role", RoleSchema);

export default Role;