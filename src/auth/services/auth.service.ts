import userService from "../../users/services/user.service";
import { CustomError, exclude, verifyPassword } from "../../utilities";
import { generateToken } from "../../utilities/jwt.utilities";
import { AuthDTO, IUserAuth } from "../dto";

const loginUser = async(auth: AuthDTO): Promise<IUserAuth> => {
  const {email, password} = auth;

  if (!email) throw new CustomError("Email invalido", 404)
  if (!password) throw new CustomError("Contraseña invalida", 404)
  
  const user = await userService.findUser("email", email)
  
  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) throw new CustomError("Contraseña incorrecta", 403)

  const token = generateToken(user.id)

  return {
    ...exclude(user, ["password"]),
    accessToken: token
  }
}

const revalidateSession = async(userId: string): Promise<IUserAuth> => {

  if (!userId) throw new CustomError("userId no existe", 404)
  
  const user = await userService.findUser("id", userId)
  
  const token = generateToken(user.id)

  return {
    ...exclude(user, ["password"]),
    accessToken: token
  }
}

export default {
  loginUser,
  revalidateSession
}