import { ASSESSMENT_MODEL, ASSESSMENT_USER_REFERENCE, USER_ASSESSMENT_PATH, USER_MODEL, USER_PORTFOLIO_PATH, PORTFOLIO_MODEL, PORTFOLIO_USER_REFERENCE, PORTFOLIO_ASSETS_PATH, ASSET_MODEL } from '@/constants/models';
import { Schema, model, models, Model, Document, PopulateOptions } from 'mongoose';
import { UserData } from '@/lib/db/schemas/user.schema';
import { AssessmentData } from '@/lib/db/schemas/assessment.schema';
import { PortfolioWithVirtuals } from './portfolio.model';

// MongoDB document interface
export interface UserDocument extends UserData, Document { }

// Mongoose schema
const userSchema = new Schema<UserDocument>(
  {
    privyId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      sparse: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for assessments
userSchema.virtual(USER_ASSESSMENT_PATH, {
  ref: ASSESSMENT_MODEL,
  localField: '_id',
  foreignField: ASSESSMENT_USER_REFERENCE,
});

// Virtual for portfolios
userSchema.virtual(USER_PORTFOLIO_PATH, {
  ref: PORTFOLIO_MODEL,
  localField: '_id',
  foreignField: PORTFOLIO_USER_REFERENCE,
});

export const User: Model<UserDocument> = models[USER_MODEL] || model<UserDocument>(USER_MODEL, userSchema);

export const UserAssessmentPopulation: PopulateOptions = {
  path: USER_ASSESSMENT_PATH,
  justOne: true,
};

export const UserPortfolioPopulation: PopulateOptions = {
  path: USER_PORTFOLIO_PATH,
  justOne: false,
};

// Population for portfolios with nested assets
export const UserPortfolioWithAssetsPopulation: PopulateOptions = {
  path: USER_PORTFOLIO_PATH,
  justOne: false,
  populate: {
    path: PORTFOLIO_ASSETS_PATH,
    model: ASSET_MODEL,
  },
};

export type UserWithAllVirtuals = UserData & {
  [USER_ASSESSMENT_PATH]: AssessmentData;
  [USER_PORTFOLIO_PATH]: PortfolioWithVirtuals[];
};

