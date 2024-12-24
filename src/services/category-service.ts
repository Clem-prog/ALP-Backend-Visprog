import { prismaClient } from "../application/database";
import { Category } from "@prisma/client";
import { ResponseError } from "../errors/response-error";
import { CategoryResponse, CreateCategoryRequest, toCategoryResponse } from "../models/category-model";
import { CategoryValidation } from "../validations/category-validation";
import { Validation } from "../validations/validation";

export class CategoryService {
    static async create(req: CreateCategoryRequest): Promise<CategoryResponse> {
        const registerReq = Validation.validate(
            CategoryValidation.CREATE,
            req
        )

        const name = await prismaClient.category.findFirst({
            where: {
                name: registerReq.name
            }
        })

        if (name) {
            throw new ResponseError(400, 'Category already exists')
        }

        const category = await prismaClient.category.create({
            data: {
                name: registerReq.name
            }
        })

        return toCategoryResponse(category)
    }
}