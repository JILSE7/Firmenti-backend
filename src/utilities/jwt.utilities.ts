import { sign, verify } from "jsonwebtoken"


export const generateToken = (id: string) => {
  const jwt = sign({id}, process.env.SECRET_JWT!, {
    expiresIn: "2h"
  })

  return jwt;
};

export const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, process.env.SECRET_JWT!);
  return isOk;
};