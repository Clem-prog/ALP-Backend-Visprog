import { z, ZodType } from "zod";

export class AnnouncementValidation {
    static readonly CREATE: ZodType = z.object({
        content: z.string().min(1),
        date: z.coerce.date(),
        event_id: z.number().int().positive()
    });

    static readonly UPDATE: ZodType = z.object({
        content: z.string().min(1),
        date: z.coerce.date(),
    });
}