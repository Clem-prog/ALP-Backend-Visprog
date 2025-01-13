import { z, ZodType } from "zod";

export class AttendanceValidation {
    static readonly CREATE: ZodType = z.object({
        event_id: z.number().int().positive(),
        date_signed: z.coerce.date(),
    });
}