import {v2 as cloudinary} from 'cloudinary'
import { IProduct } from "../entity";
import { ProductDTO } from '../dto';
import { prisma } from "../../config/db";
import { CustomError } from "../../utilities/customError.utilities";
import { exclude } from "../../utilities";



// Configuration 
cloudinary.config({
  cloud_name: "dxqnlqxa1",
  api_key: "761577474779331",
  api_secret: "aEahN3Iif7XNluShg6rUixvKlPw"
});

const createProduct = async(product: ProductDTO, img: Express.Multer.File) => {
    const { name, categoryId, description, userId } = product;
    console.log(img.path);
    if (!name||!categoryId||!description||!userId) throw new CustomError("Campos incompletos, verifique la información del producto", 404)
    console.log({product, img});
    const imgCloudinary = await cloudinary.uploader.upload(img.path);
    
    return await prisma.product.create({ data: {...product, image: imgCloudinary.secure_url} })    
}

const findProducts = async():Promise<IProduct[]> => {
  const products = await prisma.product.findMany({include: {category: true, user: true}})  
  return products.map(p => ({...p, user: exclude(p.user, ["password", "updatedAt", "phone"])}))
}

const findProductById = async(id: string):Promise<IProduct> => {
  if (!id) throw new CustomError("Id invalido", 400);

  const product = await prisma.product.findUnique({where: { id }});

  if (!product) throw new CustomError("Producto no encontrado", 404);

  return product;
}


const updateProduct = async(id: string, {description, image, name}: ProductDTO, newImage?: Express.Multer.File): Promise<IProduct> => {
  if (!id) throw new CustomError("Id undefined, por favor mande un id valido", 400);


  let product = await prisma.product.findFirst({ where: { id } });  

  if (!product) throw new CustomError(`El producto con el id ${id} no existe por lo tanto no puede ser actualizada`, 404)

  product = await prisma.product.update({where: { id }, data: { name, description, image }});  
  console.log({product});
  return product
}


const deleteProduct = async(id: string): Promise<IProduct> => {
  if (!id) throw new CustomError("Id undefined, por favor mande un id valido", 400);


  let product = await prisma.product.findFirst({ where: { id } });  

  if (!product) throw new CustomError(`El producto con el id ${id} no existe por lo tanto no puede ser actualizada`, 404)

  product = await prisma.product.delete({where: { id }});  

  return product
}


export default {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct
}