import { Request, Response } from "express";
import userService from "../services/user.service";
import { CustomError } from "../../utilities/customError.utilities";
import { UserDTO } from "../dto";


const registerUser = async(req: Request, res: Response) => {
  try {
    const body: UserDTO = req.body
    const user = await userService.createUser(body)

    return res.status(201).json({
      ok: true,
      data: user
    })

  } catch (e) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }

}

const findAllUser = async(req: Request, res: Response) => {
  try {
    const users = await userService.findUsers()

    return res.json({
      ok: true,
      data: users
    })

  } catch (e) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }

}

const findUserById = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await userService.findUserById(id);

    return res.json({
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

const updateUser = async(req: Request, res: Response) => {
  try {
    const {params, body} = req;
    const {id} = params;
    console.log({body});
    const categoryUpdated = await userService.updateUser(id, body);

    return res.status(200).json({
      ok: true,
      msg: `El usuario con el id '${id}' fue actualizado`,
      data: categoryUpdated
    });

  } catch (e) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }
}

const deleteUser = async(req: Request, res: Response) => {
  try {
    const {id} = req.params;
    await userService.deleteUser(id);

    return res.status(200).json({
      ok: true,
      msg: `El usuario con el id '${id}' fue eliminado`,
    });

  } catch (e) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }
}


export default {
  registerUser,
  findAllUser,
  findUserById,
  updateUser,
  deleteUser
}