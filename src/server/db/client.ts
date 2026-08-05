import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __sitescanSql: ReturnType<typeof postgres> | undefined;
  // eslint-disable-next-line no-var
  var __sitescanDb: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

function getConnectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return url;
}

export function getDb() {
  if (!globalThis.__sitescanDb) {
    const sql =
      globalThis.__sitescanSql ??
      postgres(getConnectionString(), {
        max: 10,
        idle_timeout: 20,
        connect_timeout: 10,
      });
    globalThis.__sitescanSql = sql;
    globalThis.__sitescanDb = drizzle(sql, { schema });
  }
  return globalThis.__sitescanDb;
}
