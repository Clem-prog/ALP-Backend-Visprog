import { NextFunction, Request, Response } from "express";
import { RegisterUserRequest, LoginUserRequest, UserResponse, AllUserResponse, UpdateUserRequest } from "../models/user-model";
import { UserService } from "../services/user-service";
import { UserRequest } from "../types/user-request";


export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: UserResponse = await UserService.register(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {

            const response: AllUserResponse[] = await UserService.getAllUser()

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUserById(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: AllUserResponse = await UserService.getUserById(req.user!);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getEventUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = parseInt(req.params.id);
            const response: AllUserResponse = await UserService.getEventUserById(user_id);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.id);
            const request: UpdateUserRequest = req.body as UpdateUserRequest;
            const response: UserResponse = await UserService.updateUser(userId, request);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response: UserResponse = await UserService.login(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: string = await UserService.logout(req.user!)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}