import { IUser } from "../entity";


export type UserDTO = Omit<IUser, "id" | "createdAt" | "updatedAt" | "deletedAt">