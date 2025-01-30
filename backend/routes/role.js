import express from 'express';
import { createRole,deleteRole,updateRole} from '../controller/roleController.js';

const roleRouter = express.Router();

roleRouter.post('/create', createRole);
roleRouter.delete('/delete/:slug', deleteRole);
roleRouter.put('/update/:slug', updateRole);

export { roleRouter };