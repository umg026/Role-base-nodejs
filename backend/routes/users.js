import express from 'express';
import { handelUserLogin, handelUserSignup, handelUserUpdate } from '../controller/authController.js'
import { verifyToken } from '../service/jwt.js';
import { checkRole } from '../middleware/checkRole.js';
const authRouter = express.Router();


authRouter.post('/signup', handelUserSignup);
authRouter.post('/login', handelUserLogin);
authRouter.put('/update/:id', verifyToken, checkRole('cutomer'), handelUserUpdate);

export { authRouter };
