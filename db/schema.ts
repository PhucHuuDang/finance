import { pgTable, text } from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});
export const insertAccountSchema = createInsertSchema(accounts);

//* 1. bun run db:generate
//* 2. bun run db:migrate
//* 3. bun run db:studio
