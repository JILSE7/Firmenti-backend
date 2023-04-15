import { IProduct } from "../entity";
import { ProductDTO } from '../dto';
import { prisma } from "../../config/db";

const createProduct = async(product: ProductDTO): Promise<IProduct> => {
    const { name, categoryId, description, image, userId } = product;

    if (!name||!categoryId||!description||!image||!userId) throw new Error("Campos incompletos, verifique la información del producto")

    return await prisma.product.create({ data: product })  
}


export default {
  createProduct
}