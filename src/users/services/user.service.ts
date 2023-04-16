import { prisma } from "../../config/db";
import { CustomError, encryptPassword, exclude } from "../../utilities";
import { UserDTO } from "../dto";
import { IUser, IUserWOP } from "../entity";


const createUser = async(user: UserDTO): Promise<IUserWOP> => {
  const { name, email, phone, password } = user;

  if (!name || !email || !phone || !password) throw new CustomError("Campos incompletos, verifique la información del usuario", 404)
  const passwordHashed = await encryptPassword(password)
  const userCreated = await prisma.user.create({ data: {...user, password: passwordHashed} });
  return exclude(userCreated, ["password"]);
  
}

const findUsers = async(): Promise<IUserWOP[]> => await prisma.user.findMany()    


const findUserById = async(id: string): Promise<IUserWOP> => {
  if (!id) throw new CustomError("Id vacio, por favor mande un id valido", 400);

  const user = await prisma.user.findUnique({where: { id }, include: { products: true }});

  if (!user) throw new CustomError(`El usuario con id ${id} no fue encontrada`, 404);

  return user;
};

const findUser = async <Key extends keyof IUser>(param: Key, value: string): Promise<IUser> => {

  const user = await prisma.user.findUnique({where: { [param]: value }, include: { products: true }});

  if (!user) throw new CustomError(`Usuario no encontrado`, 404);

  return user;
};


const updateUser = async({id, ...rest}: IUser): Promise<IUserWOP> => {
  if (!id) throw new CustomError("Id undefined, por favor mande un id valido", 400);
  
  let user = await prisma.user.findFirst({ where: { id } });  

  if (!user) throw new CustomError(`El usuario con id ${id} no existe por lo tanto no puede ser actualizada`, 404)

  user = await prisma.user.update({where: { id }, data: { ...rest }});  

  return user;
};

const deleteUser = async(id: string): Promise<IUserWOP> => {
  if (!id) throw new CustomError("Id undefined, por favor mande un id valido", 400);
  
  let user = await prisma.user.findFirst({ where: { id } });  

  if (!user) throw new CustomError(`La categoria con el id ${id} no existe por lo tanto no puede ser actualizada`, 404)

  user = await prisma.user.delete({where: { id }});  

  return user;
};


export default {
  createUser,
  findUsers,
  findUserById,
  findUser,
  updateUser,
  deleteUser,
}