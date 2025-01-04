import { Event_attended } from "@prisma/client"

export interface AttendanceRequest {
    user_id: number
    event_id: number
    date_signed: Date
  }

export interface AttendanceResponse {
    id: number
    date_signed: Date
    user_id: number
    event_id: number
}

export function toAttendanceResponse(attendance: Event_attended): AttendanceResponse {
    return {
        id: attendance.id,
        date_signed: attendance.date_signed,
        user_id: attendance.user_id,
        event_id: attendance.event_id
    }
}
