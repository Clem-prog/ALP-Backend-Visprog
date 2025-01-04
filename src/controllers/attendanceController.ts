import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { AttendanceRequest, AttendanceResponse, toAttendanceResponse } from "../models/attendance-model"

const prisma = new PrismaClient()

// Add a new attendance record
export class AttendanceController {
  static async createAttendance(req: Request, res: Response) {
    const { user_id, event_id }: AttendanceRequest = req.body

    try {
      const attendance = await prisma.event_attended.create({
        data: {
          user_id,
          event_id,
          date_signed: new Date()
        }
      })
      res.status(201).json(toAttendanceResponse(attendance))
    } catch (error) {
      console.error("Error creating attendance:", error)
      res.status(500).json({ message: "Failed to create attendance" })
    }
  }

  // Get all attendance records
  static async getAllAttendance(req: Request, res: Response) {
    try {
      const attendanceList = await prisma.event_attended.findMany()
      res.status(200).json(attendanceList.map(toAttendanceResponse))
    } catch (error) {
      console.error("Error fetching attendance records:", error)
      res.status(500).json({ message: "Failed to fetch attendance records" })
    }
  }
}
