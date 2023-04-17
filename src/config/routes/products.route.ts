import { Router } from 'express';
import {productController} from '../../products/controllers';


import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta de destino para guardar los archivos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nombre original del archivo
  }
});
const multerMiddleware2 = multer({storage});


const productsRouter = Router();

productsRouter.get('/',productController.findAllProducts);
productsRouter.post('/', multerMiddleware2.single("file") ,productController.registerProduct);
productsRouter.put('/:id', multerMiddleware2.single("file") ,productController.updateProduct);

export default productsRouter