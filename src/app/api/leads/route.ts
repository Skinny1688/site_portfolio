import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { toErrorResponse, AppError } from "@/server/lib/errors";
import { clientIpFromHeaders, rateLimit } from "@/server/lib/rate-limit";
import { createLeadSchema } from "@/server/leads/leads.dto";
import { getLeadsService } from "@/server/leads/leads.service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = clientIpFromHeaders(request.headers);
    const limited = rateLimit(`leads:${ip}`, 5, 60_000);
    if (!limited.ok) {
      throw new AppError(429, "Слишком много запросов. Попробуйте позже.", "RATE_LIMITED");
    }

    const json = await request.json().catch(() => null);
    if (!json || typeof json !== "object") {
      throw new AppError(400, "Некорректное тело запроса", "BAD_BODY");
    }

    const parsed = createLeadSchema.parse(json);
    const result = await getLeadsService().createLead(parsed);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      const telegramIssue = error.issues.find((issue) => issue.path.includes("telegram"));
      return NextResponse.json(
        {
          error:
            telegramIssue?.message ||
            "Укажите корректный Telegram, например @username",
          code: "VALIDATION_ERROR",
        },
        { status: 400 },
      );
    }
    const { status, body } = toErrorResponse(error);
    const headers =
      status === 429 && error instanceof AppError
        ? { "Retry-After": "60" }
        : undefined;
    return NextResponse.json(body, { status, headers });
  }
}
