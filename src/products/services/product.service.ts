import { IProduct } from "../entity";
import { ProductDTO } from '../dto';
import { prisma } from "../../config/db";
import { CustomError } from "../../utilities/customError.utilities";

const createProduct = async(product: ProductDTO): Promise<IProduct> => {
    const { name, categoryId, description, image, userId } = product;

    if (!name||!categoryId||!description||!image||!userId) throw new CustomError("Campos incompletos, verifique la información del producto", 404)

    return await prisma.product.create({ data: product })  
}

const findProducts = async():Promise<IProduct[]> => {
  return await prisma.product.findMany()  
}


export default {
  createProduct,
  findProducts
}