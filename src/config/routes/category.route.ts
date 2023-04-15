import { Router } from 'express'
import { categoryController } from '../../categories/controllers'

const categoriesRouter = Router()

categoriesRouter.get('/', categoryController.findAllCategories)
categoriesRouter.get('/:id', categoryController.findCategoryById)
categoriesRouter.post('/', categoryController.registerCategory)
categoriesRouter.put('/:id', categoryController.updateCategory)
categoriesRouter.delete('/:id', categoryController.deleteCategory)

export { categoriesRouter }