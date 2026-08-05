import { z } from "zod";

export const LEAD_STATUSES = ["new", "in_progress", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const quizAnswersSchema = z
  .object({
    siteType: z.string().max(80).optional(),
    hasSite: z.string().max(40).optional(),
    goal: z.string().max(80).optional(),
    timeline: z.string().max(80).optional(),
  })
  .passthrough();

export type QuizAnswers = z.infer<typeof quizAnswersSchema>;

const telegramSchema = z
  .string()
  .trim()
  .min(3, "Укажите корректный Telegram, например @username")
  .max(64)
  .regex(
    /^@?[a-zA-Z0-9_]{3,32}$/,
    "Укажите корректный Telegram, например @username",
  );

/** Public contact form — Telegram only */
export const createLeadSchema = z.object({
  telegram: telegramSchema,
  name: z.string().trim().max(80).optional().default(""),
  phone: z.string().trim().max(32).optional().default(""),
  quizAnswers: quizAnswersSchema.optional().default({}),
  source: z.string().trim().max(40).optional().default("site"),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

export const updateLeadStatusSchema = z.object({
  status: z.enum(LEAD_STATUSES),
});

export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;

export const adminLoginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(128),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export type CreateLeadResponse = {
  id: string;
  createdAt: string;
};

export type LeadAdminDto = {
  id: string;
  name: string;
  phone: string;
  telegram: string;
  quizAnswers: QuizAnswers;
  status: LeadStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadRecord = LeadAdminDto;
