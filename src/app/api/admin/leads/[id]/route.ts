import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAuthService } from "@/server/admin/auth.service";
import { toErrorResponse, AppError } from "@/server/lib/errors";
import { updateLeadStatusSchema } from "@/server/leads/leads.dto";
import { getLeadsService } from "@/server/leads/leads.service";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await getAuthService().requireAdmin();
    const { id } = await context.params;
    if (!id) {
      throw new AppError(400, "Не указан id", "BAD_ID");
    }

    const json = await request.json().catch(() => null);
    const parsed = updateLeadStatusSchema.parse(json);
    const lead = await getLeadsService().updateStatus(id, parsed);
    return NextResponse.json(lead);
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
