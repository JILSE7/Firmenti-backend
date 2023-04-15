import { Router } from 'express'
import { productsRouter } from './products.route';
import { categoriesRouter } from './category.route';

const router = Router()

//Definimos el comportamiento raiz del endpoint


//Definimos las rutas a nuestras collecciones
router.use('/product', productsRouter);
router.use('/category', categoriesRouter);


export default router