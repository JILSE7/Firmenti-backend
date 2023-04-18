import { Router } from 'express'
import productsRouter from './products.route';
import categoriesRouter  from './category.route';
import userRoute  from './user.route';
import authRouter from './auth.route';
import { verifySession } from '../../middlewares';

const router = Router()

//Definimos el comportamiento raiz del endpoint


//Definimos las rutas a nuestras collecciones
router.use('/product', verifySession,productsRouter);
router.use('/category', verifySession,categoriesRouter);
router.use('/user',userRoute);
router.use('/auth', authRouter);


export default router