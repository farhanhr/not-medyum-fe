import { z } from "zod";


export const contentFormSchema = z.object({
    title: z.string({required_error: "Title is required."}),
    excerpt: z.string({required_error: "Excerpt is required."}),
    description: z.string({required_error: "Description is required."}),
    categoryId: z.string({required_error: "Category is required."}),
})