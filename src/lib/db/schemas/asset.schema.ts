import { z } from 'zod';

// Zod schema for validation
export const AssetSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  blockchain: z.string().min(1),
  assetAddress: z.string().min(1),
  symbol: z.string().min(1),
  image: z.string().min(1),
  decimals: z.number().int().min(0),
});

export type AssetData = z.infer<typeof AssetSchema>;
