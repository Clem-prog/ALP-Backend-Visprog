import { Announcement } from "@prisma/client"

export interface CreateAnnouncementRequest {
    content: string,
    date: string
    event_id: number
}

export interface updateAnnouncementRequest {
    content: string
}

export interface AnnouncementResponse {
    id: number
    content: string
    date: Date
    event_id: number
}

export function toAnnouncementResponse(announcement: Announcement): AnnouncementResponse {
    return {
        id: announcement.id,
        content: announcement.content,
        date: announcement.date,
        event_id: announcement.event_id
    }
}
