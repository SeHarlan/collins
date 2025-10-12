import { ASSET_MODEL, PORTFOLIO_ASSETS_PATH, PORTFOLIO_MODEL, PORTFOLIO_USER_REFERENCE, USER_MODEL } from '@/constants/models';
import { Schema, model, models, Model, Document, Types, PopulateOptions } from 'mongoose';
import { PortfolioData, PortfolioAssetData } from '@/lib/db/schemas/portfolio.schema';
import { AssetData } from '@/lib/db/schemas/asset.schema';

// MongoDB document interface
export interface PortfolioDocument extends Omit<PortfolioData, 'userId' | 'assets'>, Document {
  userId: Types.ObjectId;
  assets: Array<{
    assetId: Types.ObjectId;
    amount: string;
  }>;
}

// Mongoose schema
const portfolioSchema = new Schema<PortfolioDocument>(
  {
    [PORTFOLIO_USER_REFERENCE]: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    risk: {
      type: Number,
      required: true,
      index: true,
    },
    assets: [{
      assetId: {
        type: Schema.Types.ObjectId,
        ref: ASSET_MODEL,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for populated assets
portfolioSchema.virtual(PORTFOLIO_ASSETS_PATH, {
  ref: ASSET_MODEL,
  localField: 'assets.assetId',
  foreignField: '_id',
});

export const Portfolio: Model<PortfolioDocument> = models[PORTFOLIO_MODEL] || model<PortfolioDocument>(PORTFOLIO_MODEL, portfolioSchema);

// Population for assets within the assets array
export const PortfolioAssetsNestedPopulation: PopulateOptions = {
  path: 'assets.assetId',
  model: ASSET_MODEL,
  justOne: true,
};


// Type for portfolio with nested populated assets in the assets array
export type PortfolioWithVirtuals = PortfolioData & {
  [PORTFOLIO_ASSETS_PATH]: Array<PortfolioAssetData & {
    asset: AssetData;
  }>;
};
