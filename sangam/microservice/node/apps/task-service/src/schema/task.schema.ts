import * as z from "zod";

export const taskSchema = z.object({
  title: z.string().min(5, { message: "must be 5 " }).nonempty(),
});

export type createTask = z.infer<typeof taskSchema>;
