import type {
  CreateLeadResponse,
  LeadAdminDto,
  LeadStatus,
} from "@/server/leads/leads.dto";

export type ApiError = {
  error: string;
  code?: string;
};

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json().catch(() => ({}))) as T & ApiError;
  if (!res.ok) {
    const message = data.error || "Ошибка запроса";
    throw Object.assign(new Error(message), { code: data.code, status: res.status });
  }
  return data;
}

export async function submitTelegramLead(telegram: string): Promise<CreateLeadResponse> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telegram, source: "site" }),
  });
  return parseJson<CreateLeadResponse>(res);
}

export async function adminLogin(username: string, password: string): Promise<{ ok: true }> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return parseJson<{ ok: true }>(res);
}

export async function adminLogout(): Promise<{ ok: true }> {
  const res = await fetch("/api/admin/logout", { method: "POST" });
  return parseJson<{ ok: true }>(res);
}

export async function fetchAdminLeads(): Promise<LeadAdminDto[]> {
  const res = await fetch("/api/admin/leads", { cache: "no-store" });
  const data = await parseJson<{ items: LeadAdminDto[] }>(res);
  return data.items;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<LeadAdminDto> {
  const res = await fetch(`/api/admin/leads/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return parseJson<LeadAdminDto>(res);
}
