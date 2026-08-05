import bcrypt from "bcryptjs";
import { AppError } from "@/server/lib/errors";
import type { AdminLoginInput } from "@/server/leads/leads.dto";
import {
  clearSessionCookie,
  createSessionToken,
  getSessionFromCookies,
  setSessionCookie,
  type AdminSessionPayload,
} from "./session";

export class AuthService {
  async login(input: AdminLoginInput): Promise<{ ok: true }> {
    const username = process.env.ADMIN_USER;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH?.replace(/^['"]|['"]$/g, "");
    const plainPassword = process.env.ADMIN_PASSWORD;

    if (!username || (!passwordHash && !plainPassword)) {
      throw new AppError(503, "Админ не настроен", "ADMIN_NOT_CONFIGURED");
    }

    const userOk = input.username === username;
    const passOk = passwordHash
      ? await bcrypt.compare(input.password, passwordHash)
      : input.password === plainPassword;

    if (!userOk || !passOk) {
      throw new AppError(401, "Неверный логин или пароль", "INVALID_CREDENTIALS");
    }

    const token = await createSessionToken(username);
    await setSessionCookie(token);
    return { ok: true };
  }

  async logout(): Promise<{ ok: true }> {
    await clearSessionCookie();
    return { ok: true };
  }

  async requireAdmin(): Promise<AdminSessionPayload> {
    const session = await getSessionFromCookies();
    if (!session) {
      throw new AppError(401, "Требуется авторизация", "UNAUTHORIZED");
    }
    return session;
  }
}

let authService: AuthService | undefined;

export function getAuthService(): AuthService {
  if (!authService) {
    authService = new AuthService();
  }
  return authService;
}
