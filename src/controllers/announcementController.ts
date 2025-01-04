import { NextFunction, Request, Response } from "express";
import { Announcement } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class AnnouncementController {
    static async createAnnouncement(req: Request, res: Response, next: NextFunction) {
        try {
            const { content, event_id } = req.body;

            const announcement = await prisma.announcement.create({
                data: {
                    content,
                    event_id,
                    date: new Date()
                }
            });

            res.status(201).json({
                id: announcement.id,
                content: announcement.content,
                date: announcement.date,
                event_id: announcement.event_id
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllAnnouncements(req: Request, res: Response, next: NextFunction) {
        try {
            const announcementList: Announcement[] = await prisma.announcement.findMany();

            res.status(200).json({
                data: announcementList
            });
        } catch (error) {
            next(error);
        }
    }
}
