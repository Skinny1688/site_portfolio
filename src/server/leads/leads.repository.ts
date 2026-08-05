import { randomUUID } from "crypto";
import type { CreateLeadInput, LeadRecord, LeadStatus } from "./leads.dto";
import { PostgresLeadsRepository } from "./postgres-leads.repository";

export interface LeadsRepository {
  create(input: CreateLeadInput): Promise<LeadRecord>;
  list(): Promise<LeadRecord[]>;
  updateStatus(id: string, status: LeadStatus): Promise<LeadRecord | null>;
}

/** Fallback for local unit smoke without DB. Prefer Postgres in normal runs. */
class InMemoryLeadsRepository implements LeadsRepository {
  private readonly items: LeadRecord[] = [];

  async create(input: CreateLeadInput): Promise<LeadRecord> {
    const now = new Date().toISOString();
    const record: LeadRecord = {
      id: randomUUID(),
      name: input.name,
      phone: input.phone,
      telegram: input.telegram,
      quizAnswers: input.quizAnswers ?? {},
      status: "new",
      source: input.source ?? "site",
      createdAt: now,
      updatedAt: now,
    };
    this.items.unshift(record);
    return record;
  }

  async list(): Promise<LeadRecord[]> {
    return [...this.items].sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
    );
  }

  async updateStatus(id: string, status: LeadStatus): Promise<LeadRecord | null> {
    const item = this.items.find((lead) => lead.id === id);
    if (!item) return null;
    item.status = status;
    item.updatedAt = new Date().toISOString();
    return { ...item };
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __sitescanLeadsRepo: LeadsRepository | undefined;
}

export function getLeadsRepository(): LeadsRepository {
  if (!globalThis.__sitescanLeadsRepo) {
    if (process.env.DATABASE_URL) {
      globalThis.__sitescanLeadsRepo = new PostgresLeadsRepository();
    } else {
      globalThis.__sitescanLeadsRepo = new InMemoryLeadsRepository();
    }
  }
  return globalThis.__sitescanLeadsRepo;
}
