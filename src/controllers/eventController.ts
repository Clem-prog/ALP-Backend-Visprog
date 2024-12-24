import { NextFunction, Request, Response } from "express";
import { CreateEventRequest, EventResponse } from "../models/event-model";
import { EventService } from "../services/event-service";

export class EventController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateEventRequest = req.body as CreateEventRequest;
            const response: EventResponse = await EventService.create(request);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const response: EventResponse[] = await EventService.getAllEvents();

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getEventById(req: Request, res: Response, next: NextFunction) {
        try {
            const eventId = parseInt(req.params.id);
            const response: EventResponse = await EventService.getEventById(eventId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const eventId = parseInt(req.params.id);
            const request: CreateEventRequest = req.body as CreateEventRequest;
            const response: EventResponse = await EventService.updateEvent(eventId, request);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const eventId = parseInt(req.params.id);
            await EventService.deleteEvent(eventId);

            res.status(200).json({
                data: "Event deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
