import { NextResponse } from "next/server";
import { getAuthService } from "@/server/admin/auth.service";
import { toErrorResponse } from "@/server/lib/errors";
import { getLeadsService } from "@/server/leads/leads.service";

export const runtime = "nodejs";

export async function GET() {
  try {
    await getAuthService().requireAdmin();
    const leads = await getLeadsService().listLeads();
    return NextResponse.json({ items: leads });
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
