import { prismaClient } from "../application/database";
import { Event_attended, User } from "@prisma/client";
import { ResponseError } from "../errors/response-error";
import { Validation } from "../validations/validation";
import { AttendanceValidation } from "../validations/attendance-validation";
import { AttendanceRequest, toAttendanceResponse } from "../models/attendance-model";

export class AttendanceService {
    static async createAttendance(user: User, req: AttendanceRequest) {
        console.log("User ID during attendance creation:", user.id);
        const createReq = Validation.validate(
            AttendanceValidation.CREATE,
            req
        )

        const attendance = await prismaClient.event_attended.create({
            data: {
                date_signed: createReq.date_signed,
                event_id: createReq.event_id,
                user_id: user.id,
            }
        });

        return toAttendanceResponse(attendance)
    }

    static async getAllAttendance(user: User): Promise<Event_attended[]> {
        const attendanceRecords = await prismaClient.event_attended.findMany({
            where: {
              user_id: user.id,
            },
            orderBy: {
                id: 'desc'
            },
          });

        return attendanceRecords
    }

    static async getAllEventMembers(eventId: number): Promise<Event_attended[]> {
        const attendanceRecords = await prismaClient.event_attended.findMany({
            where: {
              event_id: eventId,
            },
          });

        return attendanceRecords
    }
}