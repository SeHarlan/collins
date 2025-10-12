import { ASSET_MODEL } from '@/constants/models';
import { Schema, model, models, Model, Document } from 'mongoose';
import { AssetData } from '@/lib/db/schemas/asset.schema';

// MongoDB document interface
export interface AssetDocument extends AssetData, Document {}

// Mongoose schema
const assetSchema = new Schema<AssetDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    blockchain: {
      type: String,
      required: true,
      index: true,
    },
    assetAddress: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    symbol: {
      type: String,
      required: true,
      index: true,
    },
    image: {
      type: String,
      required: true,
    },
    decimals: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Asset: Model<AssetDocument> = models[ASSET_MODEL] || model<AssetDocument>(ASSET_MODEL, assetSchema);
