import { desc, eq } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { leads } from "@/server/db/schema";
import type { CreateLeadInput, LeadRecord, LeadStatus } from "./leads.dto";
import type { LeadsRepository } from "./leads.repository";

function toDto(row: typeof leads.$inferSelect): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    telegram: row.telegram,
    quizAnswers: (row.quizAnswers ?? {}) as LeadRecord["quizAnswers"],
    status: row.status as LeadStatus,
    source: row.source,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class PostgresLeadsRepository implements LeadsRepository {
  async create(input: CreateLeadInput): Promise<LeadRecord> {
    const db = getDb();
    const [row] = await db
      .insert(leads)
      .values({
        name: input.name,
        phone: input.phone,
        telegram: input.telegram,
        quizAnswers: (input.quizAnswers ?? {}) as Record<string, string>,
        source: input.source ?? "site",
        status: "new",
      })
      .returning();

    if (!row) {
      throw new Error("Failed to insert lead");
    }
    return toDto(row);
  }

  async list(): Promise<LeadRecord[]> {
    const db = getDb();
    const rows = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return rows.map(toDto);
  }

  async updateStatus(id: string, status: LeadStatus): Promise<LeadRecord | null> {
    const db = getDb();
    const [row] = await db
      .update(leads)
      .set({ status, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();

    return row ? toDto(row) : null;
  }
}
