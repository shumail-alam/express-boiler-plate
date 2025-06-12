import { z } from "zod";

export const registerEntity = z.object({
  email: z.string().nonempty({ message: "Email is required" }),
});

export type registerDTO = z.infer<typeof registerEntity>;
