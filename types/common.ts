import { z } from "zod";
import { JobSearchResponseSchema } from "./jsearch";

const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  uid: z.string(),
  photoUrl: z.string().optional(),
  favorites: z.array(JobSearchResponseSchema),
});
export type User = z.infer<typeof UserSchema>;
