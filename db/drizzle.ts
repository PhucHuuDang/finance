import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

//* this is like prisma
// const accountsFetch = db.query.accounts.findFirst({
//   where: {},
// });

const accountsFetch = db.select().from(schema.accounts);
