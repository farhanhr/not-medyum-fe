import { z } from "zod";

export const formSchema = z.object({
    email: z.string({ required_error: 'E-mail is required' }).email({ message: 'Email is not valid' }),
    password: z.string({ required_error: 'Password should at less 8 characters' }).min(8)
})