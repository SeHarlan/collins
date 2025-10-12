import { z } from 'zod';

export enum TimeHorizon {
  UNDER_ONE_YEAR = '1_year',
  FIVE_YEARS = '5_years',
  TEN_YEARS = '10_years',
  TWENTY_FIVE_YEARS = '25_years',
  OVER_FIFTY_YEARS = '50_years',
}

export enum MaxDrawdown {
  FIVE_PERCENT = '5_percent',
  TEN_PERCENT = '10_percent',
  TWENTY_PERCENT = '20_percent',
  THIRTY_FIFTY_PERCENT = '35_percent',
  OVER_FIFTY_PERCENT = '50_percent',
}

export enum PortfolioDropReaction {
  SELL_EVERYTHING = 'sell_everything',
  SELL_SOME = 'sell_some',
  HOLD = 'hold',
  BUY_MORE = 'buy_more',
}

export enum IncomeStability {
  VERY_UNSTABLE = 'very_unstable',
  UNSTABLE = 'unstable',
  STABLE = 'stable',
  VERY_STABLE = 'very_stable',
}

export enum EmergencyFundMonths {
  ZERO_TO_ONE = '0_1',
  TWO_TO_THREE = '2_3',
  FOUR_TO_SIX = '4_6',
  SIX_PLUS = '6_plus',
}

export enum InvestingExperience {
  NONE = 'none',
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum CryptoComfort {
  NOT_COMFORTABLE = 'not_comfortable',
  SLIGHTLY = 'slightly',
  COMFORTABLE = 'comfortable',
  VERY_COMFORTABLE = 'very_comfortable',
}

export enum GoalCriticality {
  CRITICAL_CANT_LOSE = 'critical_cant_lose',
  IMPORTANT = 'important',
  FLEXIBLE = 'flexible',
  OPTIONAL_ASPIRATIONAL = 'optional_aspirational',
}

export enum PastLossReaction {
  PANICKED_SOLD = 'panicked_sold',
  UNCOMFORTABLE = 'uncomfortable',
  MANAGED_FINE = 'managed_fine',
  UNBOTHERED = 'unbothered',
}

export enum RebalancingWillingness {
  UNLIKELY = 'unlikely',
  MAYBE = 'maybe',
  YES_QUARTERLY_ANNUALLY = 'yes_quarterly_annually',
  AUTOMATED_IS_FINE = 'automated_is_fine',
}

export const ASSESSMENT_SCHEMA_KEYS = {
  userId: 'userId',
  timeHorizon: 'timeHorizon',
  maxDrawdown: 'maxDrawdown',
  portfolioDropReaction: 'portfolioDropReaction',
  incomeStability: 'incomeStability',
  emergencyFundMonths: 'emergencyFundMonths',
  investingExperience: 'investingExperience',
  cryptoComfort: 'cryptoComfort',
  goalCriticality: 'goalCriticality',
  pastLossReaction: 'pastLossReaction',
  rebalancingWillingness: 'rebalancingWillingness',
} as const;

// Zod schema for validation
export const AssessmentSchema = z.object({
  [ASSESSMENT_SCHEMA_KEYS.userId]: z.string().min(1), // This will be the ObjectId as string
  [ASSESSMENT_SCHEMA_KEYS.timeHorizon]: z.nativeEnum(TimeHorizon),
  [ASSESSMENT_SCHEMA_KEYS.maxDrawdown]: z.nativeEnum(MaxDrawdown),
  [ASSESSMENT_SCHEMA_KEYS.portfolioDropReaction]: z.nativeEnum(
    PortfolioDropReaction,
  ),
  [ASSESSMENT_SCHEMA_KEYS.incomeStability]: z.nativeEnum(IncomeStability),
  [ASSESSMENT_SCHEMA_KEYS.emergencyFundMonths]:
    z.nativeEnum(EmergencyFundMonths),
  [ASSESSMENT_SCHEMA_KEYS.investingExperience]:
    z.nativeEnum(InvestingExperience),
  [ASSESSMENT_SCHEMA_KEYS.cryptoComfort]: z.nativeEnum(CryptoComfort),
  [ASSESSMENT_SCHEMA_KEYS.goalCriticality]: z.nativeEnum(GoalCriticality),
  [ASSESSMENT_SCHEMA_KEYS.pastLossReaction]: z.nativeEnum(PastLossReaction),
  [ASSESSMENT_SCHEMA_KEYS.rebalancingWillingness]: z.nativeEnum(
    RebalancingWillingness,
  ),
});

export type AssessmentData = z.infer<typeof AssessmentSchema>;
