import { JobDetailsResponseSchema } from "@/types/jsearch";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().nullable(),
  email: z.string(),
  uid: z.string(),
  photoUrl: z.string().optional(),
  preference: z.string().optional(),
  location: z.string().optional(),
});
export type User = z.infer<typeof UserSchema>;

const FavoritesSchema = z.array(JobDetailsResponseSchema);
export type Favorites = z.infer<typeof FavoritesSchema>;
