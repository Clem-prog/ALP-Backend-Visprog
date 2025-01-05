import { User } from "@prisma/client"

export interface RegisterUserRequest {
    username: string
    email: string
    password: string
    isAdmin: boolean
}

export interface LoginUserRequest {
    email: string,
    password: string
}

export interface UpdateUserRequest {
    email: string,
    username: string
}

export interface UserResponse {
    token?: string
    isAdmin: boolean,
    id: Number
}

export interface AllUserResponse {
    username: string
    email: string
    password: string
    isAdmin: boolean
}

export function toGetUserResponse(user: User): AllUserResponse {
    return {
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin
    }
}

export function toUserResponse(user: User): UserResponse {
    return {
        token: user.token ?? "",
        isAdmin: user.isAdmin,
        id: user.id
    }
}