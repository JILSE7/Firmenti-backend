import { compare, hash } from "bcryptjs"

const encryptPassword = async(password: string): Promise<string> => {
  const passwordHash = await hash(password, 10);
  return passwordHash
}

const verifyPassword = async(pass: string, passwordHash: string):Promise<boolean> => {
  const isValid = await compare(pass, passwordHash)
  return isValid;
}

export {
  encryptPassword, 
  verifyPassword
}