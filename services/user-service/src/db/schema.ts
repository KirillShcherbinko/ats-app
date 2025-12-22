import {
  pgTable,
  varchar,
  timestamp,
  text,
  uuid,
  foreignKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { ERole } from "@/types/common";

const roleValues = Object.values(ERole) as [ERole, ...ERole[]];

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title", { enum: roleValues })
    .notNull()
    .default(ERole.RECRUITER),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    patronymic: varchar("patronymic", { length: 100 }),
    administratorId: uuid("administrator_id").default(sql`null`),
    roleId: uuid("role_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.administratorId],
      foreignColumns: [table.id],
      name: "user_administrator_fk",
    }).onDelete("cascade"),

    foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: "user_role_fk",
    }).onDelete("restrict"),
  ]
);

export const tokens = pgTable("tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  refreshToken: text("refresh_token").notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  tokens: many(tokens),
  subordinates: many(users, {
    relationName: "userSubordinates",
  }),
  administrator: one(users, {
    fields: [users.administratorId],
    references: [users.id],
    relationName: "userSubordinates",
  }),
}));

export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));
