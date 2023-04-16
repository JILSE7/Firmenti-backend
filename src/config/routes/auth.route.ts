import { Router } from 'express';
import { authController } from '../../auth/controllers';


const authRouter = Router();

authRouter.post('/', authController.loginUser);
// authRouter.get('/:id', userController.findUserById);

export default authRouter