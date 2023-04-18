import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services";
import { CategoryDTO } from "../dto";
import { CustomError } from "../../utilities/customError.utilities";

const registerCategory = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as CategoryDTO
    const category = await categoryService.createCategory(body)
    
    return res.status(201).json({
      ok: true,
      data: category,
      msg: `Se ha creado una nueva categoria '${category.name}'`
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

const findAllCategories = async(_: Request, res: Response) => {
  try {
    const categories = await categoryService.findCategories();
    return res.json({
      ok: true,
      data: categories
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


const findCategoryById = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const category = await categoryService.findCategoryById(id);

    return res.json({
      ok: true,
      data: category
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

const updateCategory = async(req: Request, res: Response) => {
  try {
    const {params, body} = req;
    const {id} = params;
    const categoryUpdated = await categoryService.updateCategory({id, name: body.name});

    return res.status(200).json({
      ok: true,
      msg: `La categoria con el id '${id}' fue actualizada`,
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


const deleteCategory = async(req: Request, res: Response) => {
  try {
    const {id} = req.params;
    await categoryService.deleteCategory(id);

    return res.json({
      ok: true,
      msg: `La categoria con el id '${id}' fue eliminada`,
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
  registerCategory,
  findAllCategories,
  findCategoryById,
  updateCategory,
  deleteCategory
}