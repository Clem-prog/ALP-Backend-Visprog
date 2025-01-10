import { Review } from "@prisma/client";

export interface CreateReviewRequest {
    user_id: number;
    event_id: number;
    rating: number;
    title: string;
    comment: string;
}

export interface ReviewResponse {
    id: number;
    rating: number;
    comment: string;
    title: string;
    user_id: number;
    event_id: number;
}

export function toReviewResponse(review: Review): ReviewResponse {
    return {
        id: review.id,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        user_id: review.user_id,
        event_id: review.event_id
    };
}