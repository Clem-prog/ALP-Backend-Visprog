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
}