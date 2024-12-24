import { z, ZodType } from "zod";

export class EventValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1),
        location: z.string().min(1).max(255),
        date: z.coerce.date(),
        poster: z.string().min(1).max(255),
        category_id: z.number().int().positive()
    });
}