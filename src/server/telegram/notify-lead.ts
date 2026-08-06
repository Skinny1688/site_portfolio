type LeadNotifyPayload = {
  id: string;
  telegram: string;
  name: string;
  phone: string;
  source: string;
  createdAt: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildMessage(lead: LeadNotifyPayload): string {
  const lines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Telegram:</b> ${escapeHtml(lead.telegram)}`,
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Телефон:</b> ${escapeHtml(lead.phone)}`,
    `<b>Источник:</b> ${escapeHtml(lead.source)}`,
    `<b>ID:</b> <code>${escapeHtml(lead.id)}</code>`,
    `<b>Время:</b> ${escapeHtml(lead.createdAt)}`,
  ];
  return lines.join("\n");
}

/**
 * Sends a Telegram notification about a new lead.
 * Never throws — missing env or API errors are logged only.
 */
export async function notifyLeadCreated(lead: LeadNotifyPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.warn(
      "[telegram] Skip notify: TELEGRAM_BOT_TOKEN or TELEGRAM_NOTIFY_CHAT_ID is not set",
    );
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildMessage(lead),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[telegram] sendMessage failed", res.status, body);
    }
  } catch (err) {
    console.error("[telegram] sendMessage error", err);
  }
}
