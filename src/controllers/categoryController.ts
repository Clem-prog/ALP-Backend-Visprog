import { NextFunction, Request, Response } from "express";
import { CreateCategoryRequest, CategoryResponse, toCategoryResponse } from "../models/category-model";
import { CategoryService } from "../services/category-service";


export class CategoryController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateCategoryRequest = req.body as CreateCategoryRequest
            const response: CategoryResponse = await CategoryService.create(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllCategory(req: Request, res: Response, next: NextFunction) {
        try {
            
            const response: CategoryResponse[] = await CategoryService.getAllCategory()

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getTodo(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const response = await CategoryService.getCategory(
                Number(req.params.todoId)
            )

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateCategory (
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const request: CreateCategoryRequest = req.body as CreateCategoryRequest
            const response = await CategoryService.update(
                Number(req.params.categoryId), 
                request
            )

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}