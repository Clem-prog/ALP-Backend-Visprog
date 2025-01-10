import { z, ZodType } from "zod";

export class ReviewValidation {
    static readonly CREATE: ZodType = z.object({
        event_id: z.number().int().positive(),
        title: z.string().min(1),
        rating: z.number().int().min(1).max(5),
        comment: z.string().min(1)
    });
}