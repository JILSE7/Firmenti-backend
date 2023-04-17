import { Router } from 'express';
import { authController } from '../../auth/controllers';
import { verifySession } from '../../middlewares';


const authRouter = Router();

authRouter.post('/login', authController.loginUser);
authRouter.post('/renew', verifySession,authController.regenerateToken);

export default authRouter