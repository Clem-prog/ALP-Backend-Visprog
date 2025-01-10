import { prismaClient } from "../application/database";
import { User } from "@prisma/client";
import { ResponseError } from "../errors/response-error";
import { ReviewResponse, CreateReviewRequest, toReviewResponse } from "../models/review-model";
import { ReviewValidation } from "../validations/review-validation";
import { Validation } from "../validations/validation";

export class ReviewService {
    static async createReview(req: CreateReviewRequest, user: User): Promise<ReviewResponse> {
        const createReq = Validation.validate(
            ReviewValidation.CREATE,
            req
        );

        const event = await prismaClient.event.findUnique({
            where: {
                id: createReq.event_id
            }
        });

        if (!event) {
            throw new ResponseError(404, 'Event not found');
        }

        const existingReview = await prismaClient.review.findFirst({
            where: {
                event_id: createReq.event_id,
                user_id: user.id
            }
        });

        if (existingReview) {
            throw new ResponseError(400, 'You have already reviewed this event');
        }

        const review = await prismaClient.review.create({
            data: {
                rating: createReq.rating,
                title: createReq.title,
                comment: createReq.comment,
                user_id: user.id,
                event_id: createReq.event_id
            }
        });

        return toReviewResponse(review);
    }

    static async getReviewsByEventId(eventId: number): Promise<ReviewResponse[]> {
        console.log("Received eventId:", eventId);
        const reviews = await prismaClient.review.findMany({
            where: {
                event_id: eventId
            },
            orderBy: {
                id: 'desc'
            }
        });

        return reviews.map(toReviewResponse);
    }

    static async updateReview(id: number, req: CreateReviewRequest, user: User): Promise<ReviewResponse> {
        const updateReq = Validation.validate(
            ReviewValidation.CREATE,
            req
        );

        const review = await prismaClient.review.findUnique({
            where: {
                id: id
            }
        });

        if (!review) {
            throw new ResponseError(404, 'Review not found');
        }

        if (review.user_id !== user.id && !user.isAdmin) {
            throw new ResponseError(403, 'You do not have permission to update this review');
        }

        const updatedReview = await prismaClient.review.update({
            where: {
                id: id
            },
            data: {
                rating: updateReq.rating,
                title: updateReq.title,
                comment: updateReq.comment
            }
        });

        return toReviewResponse(updatedReview);
    }

    static async deleteReview(id: number, user: User): Promise<void> {
        const review = await prismaClient.review.findUnique({
            where: {
                id: id
            }
        });

        if (!review) {
            throw new ResponseError(404, 'Review not found');
        }

        if (review.user_id !== user.id && !user.isAdmin) {
            throw new ResponseError(403, 'You do not have permission to delete this review');
        }

        await prismaClient.review.delete({
            where: {
                id: id
            }
        });
    }

    static async getAllReviews(): Promise<ReviewResponse[]> {
        const reviews = await prismaClient.review.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        return reviews
    }
}