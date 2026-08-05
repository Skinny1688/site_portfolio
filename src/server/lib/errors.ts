export class AppError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function toErrorResponse(error: unknown): {
  status: number;
  body: { error: string; code?: string };
} {
  if (error instanceof AppError) {
    return {
      status: error.status,
      body: { error: error.message, code: error.code },
    };
  }

  if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
    return {
      status: 400,
      body: { error: "Некорректные данные", code: "VALIDATION_ERROR" },
    };
  }

  console.error("[api]", error);
  return {
    status: 500,
    body: { error: "Внутренняя ошибка", code: "INTERNAL_ERROR" },
  };
}
