import { Request, Response } from "express";


import { productServices } from "../services";
import { ProductDTO } from "../dto";
import { CustomError } from "../../utilities/customError";



export const registerProduct = async(req: Request, res: Response) => {
  try {
    const body = req.body as ProductDTO
    const product = await productServices.createProduct(body)

    return res.status(201).json({
      ok: true,
      data: product
    })
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }
}

export const findAllProducts = (req: Request, res: Response) => {
  try {
    return res.json({
      ok: true,
      msg: "Llego al controller"
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

export default {
  registerProduct,
  findAllProducts
}
