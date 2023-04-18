import { prisma } from "../../config/db";
import { CustomError } from "../../utilities/customError.utilities";
import { CategoryDTO } from "../dto/category.dto";
import { ICategory } from "../entity";


const createCategory = async(category: CategoryDTO): Promise<ICategory> => {
    if (!category.name) throw new CustomError("El campo 'nombre' de la categoria no puede ir vacio", 400)

    return await prisma.category.create({ data: category })  
}

const findCategories = async():Promise<ICategory[]> => {
  return await prisma.category.findMany()  
}

const findCategoryById = async(id: string):Promise<ICategory> => {
  if (!id) throw new CustomError("Id vacio, por favor mande un id valido", 400);

  const category = await prisma.category.findUnique({where: { id }});

  if (!category) throw new CustomError("La categoria no fue encontrada", 404);

  return category;
}

const updateCategory = async({id, name}: ICategory): Promise<ICategory> => {
  if (!id) throw new CustomError("Id undefined, por favor mande un id valido", 400);
  
  if (!name) throw new CustomError("El campo nombre no puede ir vacio", 400);

  let category = await prisma.category.findFirst({ where: { id } });  

  if (!category) throw new CustomError(`La categoria con el id ${id} no existe por lo tanto no puede ser actualizada`, 404)

  category = await prisma.category.update({where: { id }, data: { name }});  

  return category
}


const deleteCategory = async(id: string): Promise<ICategory> => {
  if (!id) throw new CustomError("Id undefined, por favor mande un id valido", 400);
  let category = await prisma.category.findFirst({ where: { id } });  

  if (!category) throw new CustomError("La categoria no existe por lo tanto no puede ser eliminada", 404)

  category = await prisma.category.delete({ where: { id: category.id } });  
  
  return category;
}


export default {
  createCategory,
  findCategories,
  findCategoryById,
  updateCategory,
  deleteCategory
}