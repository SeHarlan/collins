import { Schema, model, models, Model, Document, Types } from 'mongoose';
import {
  ASSESSMENT_MODEL,
  ASSESSMENT_USER_REFERENCE,
  USER_MODEL,
} from '@/constants/models';
import {
  TimeHorizon,
  MaxDrawdown,
  PortfolioDropReaction,
  IncomeStability,
  EmergencyFundMonths,
  InvestingExperience,
  CryptoComfort,
  GoalCriticality,
  PastLossReaction,
  RebalancingWillingness,
  AssessmentData,
} from '@/lib/db/schemas/assessment.schema';

// MongoDB document interface
export interface AssessmentDocument
  extends Omit<AssessmentData, 'userId'>,
    Document {
  [ASSESSMENT_USER_REFERENCE]: Types.ObjectId;
}

// Mongoose schema
const assessmentSchema = new Schema<AssessmentDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL,
      required: true,
      index: true,
    },
    timeHorizon: {
      type: String,
      required: true,
      enum: Object.values(TimeHorizon),
    },
    maxDrawdown: {
      type: String,
      required: true,
      enum: Object.values(MaxDrawdown),
    },
    portfolioDropReaction: {
      type: String,
      required: true,
      enum: Object.values(PortfolioDropReaction),
    },
    incomeStability: {
      type: String,
      required: true,
      enum: Object.values(IncomeStability),
    },
    emergencyFundMonths: {
      type: String,
      required: true,
      enum: Object.values(EmergencyFundMonths),
    },
    investingExperience: {
      type: String,
      required: true,
      enum: Object.values(InvestingExperience),
    },
    cryptoComfort: {
      type: String,
      required: true,
      enum: Object.values(CryptoComfort),
    },
    goalCriticality: {
      type: String,
      required: true,
      enum: Object.values(GoalCriticality),
    },
    pastLossReaction: {
      type: String,
      required: true,
      enum: Object.values(PastLossReaction),
    },
    rebalancingWillingness: {
      type: String,
      required: true,
      enum: Object.values(RebalancingWillingness),
    },
  },
  {
    timestamps: true,
  },
);

export const Assessment: Model<AssessmentDocument> =
  models[ASSESSMENT_MODEL] ||
  model<AssessmentDocument>(ASSESSMENT_MODEL, assessmentSchema);
