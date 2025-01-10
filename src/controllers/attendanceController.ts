import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { AttendanceRequest, AttendanceResponse, toAttendanceResponse } from "../models/attendance-model"
import { UserRequest } from "../types/user-request"
import { AttendanceService } from "../services/attendance-service"

const prisma = new PrismaClient()

// Add a new attendance record
export class AttendanceController {
  static async createAttendance(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: AttendanceRequest = req.body as AttendanceRequest
      const response: AttendanceResponse = await AttendanceService.createAttendance(req.user!, request)

      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }
  
  static async getAllAttendance(req: UserRequest, res: Response, next: NextFunction) {
    try {

      const response: AttendanceResponse[] = await AttendanceService.getAllAttendance(req.user!)

      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async getAllEventMembers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    {
      try {
        const response: AttendanceResponse[] = await AttendanceService.getAllEventMembers(
          Number(req.params.eventId)
        )

        res.status(200).json({
          data: response
        })
      } catch (error) {
        next(error)
      }
    }
  }
}
