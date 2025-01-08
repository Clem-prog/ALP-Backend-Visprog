import { prismaClient } from "../application/database";
import { Event } from "@prisma/client";
import { ResponseError } from "../errors/response-error";
import { EventResponse, CreateEventRequest, toEventResponse } from "../models/event-model";
import { EventValidation } from "../validations/event-validation";
import { Validation } from "../validations/validation";
import { User } from "@prisma/client";

export class EventService {
    static async create(
        user: User, 
        req: CreateEventRequest
    ): Promise<EventResponse> {
        const createReq = Validation.validate(
            EventValidation.CREATE,
            req
        );

        const title = await prismaClient.event.findFirst({
            where: {
                title: createReq.title
            }
        });

        if (title) {
            throw new ResponseError(400, 'You cannot have the same event name!');
        }

        const category = await prismaClient.category.findUnique({
            where: {
                id: createReq.category_id
            }
        });

        if (!category) {
            throw new ResponseError(400, 'Category does not exist');
        }

        const event = await prismaClient.event.create({
            data: {
                title: createReq.title,
                description: createReq.description,
                location: createReq.location,
                date: createReq.date,
                poster: createReq.poster,
                category_id: createReq.category_id,
                user_id: user.id
            }
        });

        return toEventResponse(event);
    }

    static async getAllEvents(): Promise<EventResponse[]> {
        const events = await prismaClient.event.findMany({
            orderBy: {
                id: 'desc'
            },
            include: {
                category: true,
                reviews: true,
                attendees: true
            }
        });
        
        return events.map(toEventResponse);
    }

    static async getEventById(id: number): Promise<EventResponse> {
        const event = await prismaClient.event.findUnique({
            where: {
                id: id
            },
            include: {
                category: true,
                reviews: true,
                attendees: true
            }
        });

        if (!event) {
            throw new ResponseError(404, 'Event not found');
        }

        return toEventResponse(event);
    }

    static async updateEvent(
        user: User,
        id: number, 
        req: CreateEventRequest
    ): Promise<EventResponse> {
        const updateReq = Validation.validate(
            EventValidation.CREATE,
            req
        );

        const existingEvent = await prismaClient.event.findUnique({
            where: {
                id: id,
                user_id: user.id
            }
        });

        if (!existingEvent) {
            throw new ResponseError(404, 'Event not found');
        }

        const category = await prismaClient.category.findUnique({
            where: {
                id: updateReq.category_id
            }
        });

        if (!category) {
            throw new ResponseError(400, 'Category does not exist');
        }

        const event = await prismaClient.event.update({
            where: {
                id: id
            },
            data: {
                title: updateReq.title,
                description: updateReq.description,
                location: updateReq.location,
                date: updateReq.date,
                poster: updateReq.poster,
                category_id: updateReq.category_id
            }
        });

        return toEventResponse(event);
    }

    static async markEventAsCompleted(user: User, id: number): Promise<EventResponse> {
        const existingEvent = await prismaClient.event.findUnique({
            where: {
                id: id,
                user_id: user.id
            }
        });
    
        if (!existingEvent) {
            throw new ResponseError(404, 'Event not found');
        }
    
        const updatedEvent = await prismaClient.event.update({
            where: {
                id: id
            },
            data: {
                isOngoing: false
            }
        });
    
        return toEventResponse(updatedEvent);
    }
    

    static async deleteEvent(
        user: User,
        id: number
    ): Promise<void> {
        const existingEvent = await prismaClient.event.findUnique({
            where: {
                id: id,
                user_id: user.id
            }
        });

        if (!existingEvent) {
            throw new ResponseError(404, 'Event not found');
        }

        await prismaClient.event.delete({
            where: {
                id: id
            }
        });
    }
}