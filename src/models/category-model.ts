import { Category } from "@prisma/client";

export interface CreateCategoryRequest {
    name: string
}

export interface CategoryResponse {
    name: string
}

export function toCategoryResponse(category: Category): CategoryResponse {
    return {
        name: category.name
    }
}
