import { z } from 'zod';

// Zod schema for validation
export const UserSchema = z.object({
  privyId: z.string().min(1),
  email: z.string().email().optional(),
});

export type UserData = z.infer<typeof UserSchema>;
