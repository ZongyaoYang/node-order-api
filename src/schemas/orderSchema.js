import { z } from "zod";

export const createOrderSchema = z
  .object({
    memberId: z.string().trim().min(1, "Member ID is required."),

    cardType: z.enum(["new", "replacement", "renewal"], {
      error: "Card type must be new, replacement, or renewal",
    }),

    shippingMethod: z.enum(["standard", "expedited"], {
      error: "Shipping method must be standard or expedited.",
    }),
  })
  .strict();

export const listOrdersQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1, "Page must be at least 1.").default(1),

    limit: z.coerce
      .number()
      .int()
      .min(1, "Limit must be at least 1.")
      .max(100, "Limit cannot exceed 100.")
      .default(20),

    status: z
      .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
      .optional(),

    memberId: z.string().trim().min(1, "Member ID cannot be empty.").optional(),
  })
  .strict();
