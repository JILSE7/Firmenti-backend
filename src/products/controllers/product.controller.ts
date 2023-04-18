import { Request, Response } from "express";
import { productServices } from "../services";
import { ProductDTO } from "../dto";
import { CustomError } from "../../utilities/";



const registerProduct = async(req: Request, res: Response) => {
  try {    
    const body = req.body as {productData: string}
    const productData: ProductDTO = JSON.parse(body.productData)
    const productImage = req.file
    console.log({productData, productImage});

    const product = await productServices.createProduct(productData, productImage!);

    return res.status(201).json({
      ok: true,
      data: product
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }
}

const findAllProducts = async(req: Request, res: Response) => {
  try {
    const products = await productServices.findProducts();

    return res.json({
      ok: true,
      data: products
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


const findProductById = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await productServices.findProductById(id);

    return res.json({
      ok: true,
      data: product
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


const findProductByUser = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    console.log({id});
    const product = await productServices.findProductByUser(id);
    
    return res.json({
      ok: true,
      data: product
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


const updateProduct = async(req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const body = req.body
    const productData: ProductDTO = JSON.parse(body.productData)
    const productImage = req.file
    console.log({productData});
    const categoryUpdated = await productServices.updateProduct(id ,{...productData}, productImage);

    return res.status(200).json({
      ok: true,
      msg: `El producto con el id '${id}' fue actualizada`,
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

const deleteProduct = async(req: Request, res: Response,) => {
  try {
    const {id} = req.params;
    await productServices.deleteProduct(id);

    return res.json({
      ok: true,
      msg: `El producto con el id '${id}' fue eliminado`,
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



export const productController = {
  registerProduct,
  findAllProducts,
  findProductById,
  findProductByUser,
  updateProduct,
  deleteProduct
}
