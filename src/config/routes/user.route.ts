import { Router } from 'express';
import { userController } from '../../users/controllers';

const usersRouter = Router();

usersRouter.get('/', userController.findAllUser);
usersRouter.get('/:id', userController.findUserById);
usersRouter.post('/', userController.registerUser);
usersRouter.put('/:id', userController.updateUser);
usersRouter.delete('/:id', userController.deleteUser);

export default usersRouter