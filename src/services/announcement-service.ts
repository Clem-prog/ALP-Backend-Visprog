import { prismaClient } from "../application/database";
import { Announcement, User } from "@prisma/client";
import { ResponseError } from "../errors/response-error";
import { Validation } from "../validations/validation";
import { AnnouncementValidation } from "../validations/announcement-validation";
import { CreateAnnouncementRequest, toAnnouncementResponse, updateAnnouncementRequest } from "../models/announcement-model";

export class AnnouncementService {
    static async createAnnouncement(user: User, req: CreateAnnouncementRequest) {
        const createReq = Validation.validate(
            AnnouncementValidation.CREATE,
            req
        )

        const announcement = await prismaClient.announcement.create({
            data: {
                content: createReq.content,
                date: createReq.date,
                event_id: createReq.event_id
            }
        });

        return toAnnouncementResponse(announcement)
    }

    static async getAllAnnouncement(): Promise<Announcement[]> {
        const allAnnouncement = await prismaClient.announcement.findMany({
            orderBy: {
                id: 'desc'
            },
        })

        return allAnnouncement
    }

    static async getAnnouncementById(id: number): Promise<Announcement> {
        const announcement = await prismaClient.announcement.findUnique({
            where: { id },
        });
    
        if (!announcement) {
            throw new Error(`Announcement with ID ${id} not found.`);
        }
    
        return toAnnouncementResponse(announcement);
    }
    

    static async updateAnnouncement(id: number, req: updateAnnouncementRequest) {
        const updateReq = Validation.validate(
            AnnouncementValidation.UPDATE,
            req
        );

        const updatedAnnouncement = await prismaClient.announcement.update({
            where: { id },
            data: {
                content: updateReq.content,
                date: updateReq.date,
            },
        });

        return toAnnouncementResponse(updatedAnnouncement);
    }

    static async deleteAnnouncement(id: number): Promise<void> {
        const announcement = await prismaClient.announcement.findUnique({
            where: { id },
        });

        if (!announcement) {
            throw new Error(`Announcement with ID ${id} not found.`);
        }

        await prismaClient.announcement.delete({
            where: { id },
        });
    }
}