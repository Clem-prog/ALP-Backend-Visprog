import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";

export const eventMiddleware = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
) => {
    const eventId = parseInt(req.params.id);
    const user = req.user;

    if (!user) {
        throw new ResponseError(401, "Unauthorized access");
    }

    if (user.isAdmin) {
        next();
        return;
    }
     // really not sure about event atttendance logic
    const eventAttendance = await prismaClient.event_attended.findFirst({
        where: {
            AND: [
                { event_id: eventId },
                { user_id: user.id }
            ]
        }
    });

    if (!eventAttendance) {
        throw new ResponseError(403, "You don't have permission to modify this event");
    }

    next();
}