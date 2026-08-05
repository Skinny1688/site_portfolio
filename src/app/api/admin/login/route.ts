import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAuthService } from "@/server/admin/auth.service";
import { toErrorResponse, AppError } from "@/server/lib/errors";
import { clientIpFromHeaders, rateLimit } from "@/server/lib/rate-limit";
import { adminLoginSchema } from "@/server/leads/leads.dto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = clientIpFromHeaders(request.headers);
    const limited = rateLimit(`admin-login:${ip}`, 10, 60_000);
    if (!limited.ok) {
      throw new AppError(429, "Слишком много попыток входа", "RATE_LIMITED");
    }

    const json = await request.json().catch(() => null);
    const parsed = adminLoginSchema.parse(json);
    const result = await getAuthService().login(parsed);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Некорректные данные", code: "VALIDATION_ERROR" },
        { status: 400 },
      );
    }
    const { status, body } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
