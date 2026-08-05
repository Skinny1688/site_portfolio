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

export const createLeadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Укажите телефон")
    .max(32)
    .regex(/^[\d\s+\-()]+$/, "Некорректный телефон"),
  telegram: z
    .string()
    .trim()
    .min(2, "Укажите Telegram")
    .max(64)
    .regex(/^@?[a-zA-Z0-9_]{3,}$|^[\d+\-() ]+$/, "Некорректный Telegram"),
  quizAnswers: quizAnswersSchema.default({}),
  source: z.string().trim().max(40).default("site"),
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

/** Public create response */
export type CreateLeadResponse = {
  id: string;
  createdAt: string;
};

/** Admin list item — no internal secrets */
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
