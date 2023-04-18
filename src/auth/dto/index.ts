import { IUserWOP } from "../../users/entity";

export interface AuthDTO {
  email    : string;
  password : string;
}

export interface IUserAuth extends IUserWOP {
  accessToken: string
}