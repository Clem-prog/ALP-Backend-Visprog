import { Event } from "@prisma/client";

export interface CreateEventRequest {
    title: string;
    description: string;
    location: string;
    date: Date;
    poster: string;
    category_id: number;
}

export interface EventResponse {
    id: number;
    title: string;
    isOngoing: Boolean;
    description: string;
    location: string;
    date: Date;
    poster: string;
    category_id: number;
    user_id: number;
}

export function toEventResponse(event: Event): EventResponse {
    return {
        id: event.id,
        title: event.title,
        isOngoing: event.isOngoing,
        description: event.description,
        location: event.location,
        date: event.date,
        poster: event.poster,
        category_id: event.category_id,
        user_id: event.user_id
    };
}