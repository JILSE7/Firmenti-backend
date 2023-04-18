import { Request, Response } from "express";
import { authService } from "../services";
import { AuthDTO } from "../dto";
import { CustomError } from "../../utilities";


const loginUser = async(req: Request, res: Response) => {
  try {
    const auth: AuthDTO = req.body
    const user = await authService.loginUser(auth);

    return res.status(200).json({
      ok: true,
      data: user
    });

  } catch (e) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }
};

const regenerateToken = async(req: Request, res: Response) => {
  try {
    const {userId} = req;

    if(!userId) throw new CustomError("UserId no existe en la peticion", 400)
  
    const newSession = await authService.revalidateSession(userId)
    res.json({
        ok: true,
        data: newSession
    })
  } catch (e) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }
};

export default {
  loginUser,
  regenerateToken
}