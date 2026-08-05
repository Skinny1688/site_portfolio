import { AppError } from "@/server/lib/errors";
import { sanitizeQuizAnswers, sanitizeText } from "@/server/lib/sanitize";
import type {
  CreateLeadInput,
  CreateLeadResponse,
  LeadAdminDto,
  LeadStatus,
  UpdateLeadStatusInput,
} from "./leads.dto";
import { getLeadsRepository, type LeadsRepository } from "./leads.repository";

function normalizeTelegram(value: string): string {
  const cleaned = sanitizeText(value).replace(/^@+/, "");
  return cleaned ? `@${cleaned}` : "";
}

export class LeadsService {
  constructor(private readonly repo: LeadsRepository = getLeadsRepository()) {}

  async createLead(raw: CreateLeadInput): Promise<CreateLeadResponse> {
    const telegram = normalizeTelegram(raw.telegram);
    const input: CreateLeadInput = {
      telegram,
      name: sanitizeText(raw.name || telegram),
      phone: sanitizeText(raw.phone || "—"),
      source: sanitizeText(raw.source ?? "site") || "site",
      quizAnswers: sanitizeQuizAnswers(raw.quizAnswers ?? {}),
    };

    const lead = await this.repo.create(input);

    // TODO: Telegram bot notifications
    return { id: lead.id, createdAt: lead.createdAt };
  }

  async listLeads(): Promise<LeadAdminDto[]> {
    return this.repo.list();
  }

  async updateStatus(id: string, input: UpdateLeadStatusInput): Promise<LeadAdminDto> {
    const updated = await this.repo.updateStatus(id, input.status as LeadStatus);
    if (!updated) {
      throw new AppError(404, "Заявка не найдена", "LEAD_NOT_FOUND");
    }
    return updated;
  }
}

let leadsService: LeadsService | undefined;

export function getLeadsService(): LeadsService {
  if (!leadsService) {
    leadsService = new LeadsService();
  }
  return leadsService;
}
