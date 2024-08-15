import { z } from "zod";
 
export const formSchema = z.object({
   classrooms: z.coerce.number().int().positive(),
  students: z.coerce.number().int().positive(),

});
 
export type FormSchema = typeof formSchema;