"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../errors/response-error");
const category_model_1 = require("../models/category-model");
const category_validation_1 = require("../validations/category-validation");
const validation_1 = require("../validations/validation");
class CategoryService {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerReq = validation_1.Validation.validate(category_validation_1.CategoryValidation.CREATE, req);
            const name = yield database_1.prismaClient.category.findFirst({
                where: {
                    name: registerReq.name
                }
            });
            if (name) {
                throw new response_error_1.ResponseError(400, 'Category already exists');
            }
            const category = yield database_1.prismaClient.category.create({
                data: {
                    name: registerReq.name
                }
            });
            return (0, category_model_1.toCategoryResponse)(category);
        });
    }
    static getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const allCategory = yield database_1.prismaClient.category.findMany({
                orderBy: {
                    id: 'asc'
                },
            });
            return allCategory;
        });
    }
}
exports.CategoryService = CategoryService;
