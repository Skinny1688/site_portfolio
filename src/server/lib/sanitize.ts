export function sanitizeText(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

export function sanitizeQuizAnswers(
  answers: Record<string, unknown>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, raw] of Object.entries(answers)) {
    if (typeof raw !== "string") continue;
    const cleanKey = sanitizeText(key).slice(0, 40);
    if (!cleanKey) continue;
    result[cleanKey] = sanitizeText(raw).slice(0, 120);
  }
  return result;
}
