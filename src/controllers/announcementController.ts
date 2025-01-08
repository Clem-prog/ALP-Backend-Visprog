import { NextFunction, Request, Response } from "express";
import { Announcement } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { AnnouncementResponse, CreateAnnouncementRequest, updateAnnouncementRequest } from "../models/announcement-model";
import { AnnouncementService } from "../services/announcement-service";
import { UserRequest } from "../types/user-request";
const prisma = new PrismaClient();

export class AnnouncementController {
    static async createAnnouncement(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateAnnouncementRequest = req.body as CreateAnnouncementRequest
            const response: AnnouncementResponse = await AnnouncementService.createAnnouncement(req.user!, request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllAnnouncements(req: Request, res: Response, next: NextFunction) {
        try {
            const announcementList: Announcement[] = await AnnouncementService.getAllAnnouncement()

            res.status(200).json({
                data: announcementList
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAnnouncementById(req: Request, res: Response, next: NextFunction) {
        try {
            const announcementId = parseInt(req.params.id);
            const response: AnnouncementResponse = await AnnouncementService.getAnnouncementById(announcementId);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateAnnouncement(req: Request, res: Response, next: NextFunction) {
        try {
            const announcementId = parseInt(req.params.id)
            const request: updateAnnouncementRequest = req.body as updateAnnouncementRequest
            const response: AnnouncementResponse = await AnnouncementService.updateAnnouncement(announcementId, request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteAnnouncement(req: Request, res: Response, next: NextFunction) {
        try {
            const announcementId = parseInt(req.params.id);
            await AnnouncementService.deleteAnnouncement(announcementId);

            res.status(200).json({
                data: "Event deleted successfully"
            });
        } catch (error) {
            next(error);
        }

    }
}
