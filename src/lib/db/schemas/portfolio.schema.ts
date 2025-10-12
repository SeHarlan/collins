import { z } from 'zod';

// Schema for tracking asset amounts in portfolio
export const PortfolioAssetSchema = z.object({
  assetId: z.string().min(1), // Asset ObjectId as string
  amount: z.string().min(1), // Amount as string to preserve precision
});

export type PortfolioAssetData = z.infer<typeof PortfolioAssetSchema>;

// Zod schema for validation
export const PortfolioSchema = z.object({
  name: z.string().min(1),
  risk: z.number(),
  userId: z.string().min(1), // This will be the ObjectId as string
  assets: z.array(PortfolioAssetSchema).default([]), // Array of assets with amounts
});

export type PortfolioData = z.infer<typeof PortfolioSchema>;
