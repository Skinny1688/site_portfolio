import { NextResponse } from "next/server";
import { getAuthService } from "@/server/admin/auth.service";
import { toErrorResponse } from "@/server/lib/errors";

export const runtime = "nodejs";

export async function POST() {
  try {
    const result = await getAuthService().logout();
    return NextResponse.json(result);
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
