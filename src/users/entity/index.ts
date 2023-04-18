export interface  IUser {
  id        : string;   
  email     : string;   
  name      : string;
  phone     : string;
  password  : string;
  createdAt : Date;
  updatedAt : Date;
}

export type IUserWOP = Omit<IUser, "password">