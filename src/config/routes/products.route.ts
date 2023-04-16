import { Router } from 'express';
import { productsController } from '../../products/controllers';


const productsRouter = Router();

productsRouter.get('/',productsController.findAllProducts);
productsRouter.post('/',productsController.registerProduct);

export default productsRouter