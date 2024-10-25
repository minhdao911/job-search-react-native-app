import { JobSearchResponseDataSchema } from "@/types/jsearch";
import { z } from "zod";

export enum Table {
  Users = "users",
  Favorites = "favorites",
}

const UserSchema = z.object({
  name: z.string().nullish(),
  email: z.string(),
  uid: z.string(),
  photoUrl: z.string().optional(),
  isOnboarded: z.boolean(),
  preferences: z.string().optional(),
  location: z.string().optional(),
  created: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema>;

const FavoritesSchema = z.array(JobSearchResponseDataSchema);
export type Favorites = z.infer<typeof FavoritesSchema>;

const LocalUserSchema = UserSchema.extend({
  favorites: FavoritesSchema,
});
export type LocalUser = z.infer<typeof LocalUserSchema>;
