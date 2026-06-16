import { z } from 'zod';

// Odpowiednik post-schema.json — additionalProperties: false, strict Zod schema
export const PostSchema = z.object({
  id:     z.number().int().min(1),
  title:  z.string().min(1),
  body:   z.string().min(1),
  userId: z.number().int().min(1),
}).strict();

export const PostsArraySchema = z.array(PostSchema).min(1);

export type Post = z.infer<typeof PostSchema>;