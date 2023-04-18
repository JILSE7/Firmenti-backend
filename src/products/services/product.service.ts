
import { IProduct } from "../entity";
import { ProductDTO } from '../dto';
import { prisma } from "../../config/db";
import { CustomError } from "../../utilities/customError.utilities";
import { exclude } from "../../utilities";
import cloudinary from "../../config/cloudinary";


const createProduct = async(product: ProductDTO, img: Express.Multer.File): Promise<IProduct> => {
    const { name, categoryId, description, userId } = product;

    
    if (!name||!categoryId||!description||!userId) throw new CustomError("Campos incompletos, verifique la información del producto", 404)
    

    const imgCloudinary = await cloudinary.uploader.upload(img.path);
    
    return await prisma.product.create({ data: {...product, image: imgCloudinary.secure_url} })    
}

const findProducts = async():Promise<IProduct[]> => {
  const products = await prisma.product.findMany({include: {category: true, user: true}})  
  return products.map(p => ({...p, user: exclude(p.user, ["password", "updatedAt", "phone"])}))
}

const findProductById = async(id: string):Promise<IProduct> => {
  if (!id) throw new CustomError("Id invalido", 400);

  const product = await prisma.product.findUnique({where: { id }, include: { category: true }});

  if (!product) throw new CustomError("Producto no encontrado", 404);

  return product;
}

const findProductByUser = async(userId: string): Promise<IProduct[]> => {
  const products = await prisma.product.findMany({where: { userId }, include: { category: true }});
  
  if (!products) throw new CustomError(`Producto no encontrado`, 404);

  return products;
};


const updateProduct = async(id: string, {description, image, name, categoryId}: ProductDTO, newImage?: Express.Multer.File): Promise<IProduct> => {
  if (!id) throw new CustomError("Id undefined, por favor mande un id valido", 400);

  let product = await prisma.product.findFirst({ where: { id } });  

  if (!product) throw new CustomError(`El producto con el id ${id} no existe por lo tanto no puede ser actualizada`, 404)


  if (newImage) {
    
    const imageId = product.image.split('/').at(-1)?.split('.').at(0);

    if (imageId) await cloudinary.uploader.destroy(imageId);

    const imgCloudinary = await cloudinary.uploader.upload(newImage.path);

    image = imgCloudinary.secure_url;
  }
  

  product = await prisma.product.update({where: { id }, data: { name, description, image, categoryId }});  
  
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
  deleteProduct,
  findProductByUser
}