import { z } from "zod";

export const TicketCreateSchema = z.object({
    question: z
    .string()
    .nonempty({ message: 'Question help title cannot be empty!' }),
    answers:  z
    .array(z.string())
    .min(1, { message: 'Answers cannot be empty!' }),
})