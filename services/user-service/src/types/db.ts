import { users, roles, tokens } from "@/db/schema";

////////// Типы схем БД //////////
export type TUser = typeof users.$inferSelect;
export type TNewUser = typeof users.$inferInsert;

export type TRole = typeof roles.$inferSelect;
export type TNewRole = typeof roles.$inferInsert;

export type TToken = typeof tokens.$inferSelect;
export type TNewToken = typeof tokens.$inferInsert;
