import { prismaClient } from "../application/database";
import { Category, User } from "@prisma/client";
import { ResponseError } from "../errors/response-error";
import { CategoryResponse, CreateCategoryRequest, toCategoryResponse } from "../models/category-model";
import { CategoryValidation } from "../validations/category-validation";
import { Validation } from "../validations/validation";

export class CategoryService {
    static async create(
        user: User, 
        req: CreateCategoryRequest
    ): Promise<CategoryResponse> {
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
                name: registerReq.name,
                user_id: user.id
            }
        })

        return toCategoryResponse(category)
    }

    static async getAllCategory(): Promise<Category[]> {
        const allCategory = await prismaClient.category.findMany({
            orderBy: {
                id: 'asc'
            },
        })

        return allCategory
    }

    static async getCategory(categoryID: number): Promise<CategoryResponse> {
        const category = await prismaClient.category.findUnique({
            where: {
                id: categoryID,
            }
        })

        if (!category) {
            throw new ResponseError(404, "Category not found!")
        }

        return category
    }

    static async update(
        categoryId: number,
        req: CreateCategoryRequest
    ): Promise<string> {
        const categoryValidation = Validation.validate(
            CategoryValidation.CREATE,
            req
        )

        const category = await prismaClient.category.findUnique({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            throw new ResponseError(404, "Todo not found!")
        }

        await prismaClient.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: categoryValidation.name
            }
        })

        return "Data updated successfully!"
    }

    static async deleteCategory(id: number): Promise<void> {
        const existingCategory = await prismaClient.category.findUnique({
            where: {
                id: id
            }
        });

        if (!existingCategory) {
            throw new ResponseError(404, 'Category not found');
        }

        await prismaClient.category.delete({
            where: {
                id: id
            }
        });
    }
}