
export interface IProduct {
  id          : string;
  name        : string;
  description : string;
  image       : string;
  userId      : string;
  categoryId  : string | null;
  createdAt   : Date;
  updatedAt   : Date;
} 


