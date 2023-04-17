import { IProduct } from "../entity";

export type ProductDTO = Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>