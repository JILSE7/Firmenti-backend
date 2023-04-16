import { NextFunction, Response, Request } from "express";
import { CustomError, verifyToken } from "../utilities";




const verifySession = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization || "";
    const jwt = bearerToken.split(" ").pop(); // [Bearer 4544554]
    const isUser = verifyToken(`${jwt}`) as { id: string };
    if (!isUser)  throw new CustomError("Token invalido", 401);

    req.userId = isUser.id;
    next();
  } catch (e) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }
};

export default verifySession