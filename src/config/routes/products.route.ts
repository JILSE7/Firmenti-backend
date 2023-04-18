import { Router } from 'express';
import {productController} from '../../products/controllers';


import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  }
});
const multerMiddleware2 = multer({storage});


const productsRouter = Router();

productsRouter.get('/',productController.findAllProducts);
productsRouter.get('/:id',productController.findProductById);
productsRouter.get('/me/:id',productController.findProductByUser);
productsRouter.post('/', multerMiddleware2.single("file") ,productController.registerProduct);
productsRouter.put('/:id', multerMiddleware2.single("file") ,productController.updateProduct);
productsRouter.delete('/:id', productController.deleteProduct);

export default productsRouter