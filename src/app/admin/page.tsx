"use client";

import { useCallback, useEffect, useState } from "react";
import {
  adminLogin,
  adminLogout,
  fetchAdminLeads,
  updateLeadStatus,
} from "@/api/client";
import type { LeadAdminDto, LeadStatus } from "@/server/leads/leads.dto";

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Новое",
  in_progress: "В работе",
  closed: "Закрыто",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<LeadAdminDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadLeads = useCallback(async () => {
    const items = await fetchAdminLeads();
    setLeads(items);
    setAuthed(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadLeads();
      } catch {
        if (!cancelled) setAuthed(false);
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadLeads]);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminLogin(username, password);
      await loadLeads();
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }

  async function onLogout() {
    await adminLogout();
    setAuthed(false);
    setLeads([]);
  }

  async function onStatusChange(id: string, status: LeadStatus) {
    const updated = await updateLeadStatus(id, status);
    setLeads((prev) => prev.map((lead) => (lead.id === id ? updated : lead)));
  }

  if (checking) {
    return <p className="text-sm text-muted-foreground">Проверка сессии…</p>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md rounded-[var(--radius-lg)] border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
        <h1 className="font-display text-2xl font-bold">Вход в админку</h1>
        <p className="mt-2 text-sm text-muted-foreground">Только для владельца SiteScan.</p>
        <form className="mt-6 space-y-4" onSubmit={onLogin}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Логин</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-border px-3 py-2.5"
              autoComplete="username"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-border px-3 py-2.5"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[var(--radius-md)] bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent cursor-pointer disabled:opacity-60"
          >
            {loading ? "Вход…" : "Войти"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Заявки</h1>
          <p className="text-sm text-muted-foreground">{leads.length} всего</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-[var(--radius-md)] border border-border px-4 py-2 text-sm font-semibold cursor-pointer"
        >
          Выйти
        </button>
      </div>

      {leads.length === 0 ? (
        <p className="rounded-[var(--radius-md)] border border-dashed border-border bg-card p-8 text-sm text-muted-foreground">
          Заявок пока нет.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[var(--radius-md)] border border-border bg-card">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Дата</th>
                <th className="px-4 py-3 font-semibold">Имя</th>
                <th className="px-4 py-3 font-semibold">Контакты</th>
                <th className="px-4 py-3 font-semibold">Квиз</th>
                <th className="px-4 py-3 font-semibold">Статус</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleString("ru-RU")}
                  </td>
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3">
                    <div>{lead.phone}</div>
                    <div className="text-muted-foreground">{lead.telegram}</div>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-xs text-muted-foreground">
                    {Object.entries(lead.quizAnswers || {})
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(" · ") || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                      className="rounded-[var(--radius-sm)] border border-border bg-background px-2 py-1.5 cursor-pointer"
                    >
                      {(Object.keys(STATUS_LABEL) as LeadStatus[]).map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABEL[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
