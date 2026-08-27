import { z } from "zod";

export const createOrderSchema = z.object(
    {
        memberId: z.string().trim().min(1, "Member ID is required."),
        
        cardType: z.enum(
            ["new", "replacement", "renewal"],
            {
                error: "Card type must be new, replacement, or renewal",
            }
        ),

        shippingMethod: z.enum(
            ["standard", "expedited"],
            {
                error: "Shipping method must be standard or expedited."
            }
        ),
    }
).strict();