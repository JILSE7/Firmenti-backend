import { Router } from 'express';
import { userController } from '../../users/controllers';
import { verifySession } from '../../middlewares';

const usersRouter = Router();

usersRouter.get('/', verifySession,userController.findAllUser);
usersRouter.get('/:id', verifySession,userController.findUserById);
usersRouter.post('/', userController.registerUser);
usersRouter.put('/:id', verifySession ,userController.updateUser);
usersRouter.delete('/:id', verifySession,userController.deleteUser);

export default usersRouter