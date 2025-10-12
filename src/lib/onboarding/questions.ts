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
  ASSESSMENT_SCHEMA_KEYS,
} from '@/lib/db/schemas/assessment.schema';
import { ReactNode } from 'react';

export interface OnboardingOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}
export interface OnboardingQuestion {
  id: keyof typeof ASSESSMENT_SCHEMA_KEYS;
  icon: ReactNode;
  title: string;
  subtitle: string;
  type: 'buttons' | 'slider' | 'images' | 'toggle' | 'multiple';
  options: OnboardingOption[];
  required: boolean;
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: ASSESSMENT_SCHEMA_KEYS.investingExperience,
    icon: '🌱',
    title: "What's your investing experience?",
    subtitle: 'This helps us tailor your experience',
    type: 'buttons',
    required: true,
    options: [
      {
        value: InvestingExperience.NONE,
        label: 'New to investing',
        description: 'Just getting started',
        icon: '🌱',
      },
      {
        value: InvestingExperience.BEGINNER,
        label: 'Beginner',
        description: 'Some basic knowledge',
        icon: '📚',
      },
      {
        value: InvestingExperience.INTERMEDIATE,
        label: 'Intermediate',
        description: 'Comfortable with basics',
        icon: '💡',
      },
      {
        value: InvestingExperience.ADVANCED,
        label: 'Advanced',
        description: 'Experienced investor',
        icon: '🚀',
      },
    ],
  },
  {
    id: ASSESSMENT_SCHEMA_KEYS.timeHorizon,
    icon: '📅',
    title: 'When do you plan to use this money?',
    subtitle: 'Your timeline affects your investment strategy',
    type: 'buttons',
    required: true,
    options: [
      {
        value: TimeHorizon.UNDER_ONE_YEAR,
        label: 'Under 1 year',
        description: 'Short-term goals',
        icon: '⚡',
      },
      {
        value: TimeHorizon.FIVE_YEARS,
        label: '1-5 years',
        description: 'Medium-term goals',
        icon: '📅',
      },
      {
        value: TimeHorizon.TEN_YEARS,
        label: '5-10 years',
        description: 'Long-term goals',
        icon: '🎯',
      },
      {
        value: TimeHorizon.TWENTY_FIVE_YEARS,
        label: '10-25 years',
        description: 'Retirement planning',
        icon: '🏖️',
      },
      {
        value: TimeHorizon.OVER_FIFTY_YEARS,
        label: '25+ years',
        description: 'Generational wealth',
        icon: '👨‍👩‍👧‍👦',
      },
    ],
  },
  {
    id: ASSESSMENT_SCHEMA_KEYS.maxDrawdown,
    icon: '📉',
    title: 'How much loss can you handle?',
    subtitle: "Everyone's comfort level is different",
    type: 'buttons',
    required: true,
    options: [
      {
        value: MaxDrawdown.FIVE_PERCENT,
        label: '5%',
        description: 'Very conservative',
        icon: '🪦',
      },
      {
        value: MaxDrawdown.TEN_PERCENT,
        label: '10%',
        description: 'Conservative',
        icon: '🙏',
      },
      {
        value: MaxDrawdown.TWENTY_PERCENT,
        label: '20%',
        description: 'Moderate',
        icon: '🐢',
      },
      {
        value: MaxDrawdown.THIRTY_FIFTY_PERCENT,
        label: '35%',
        description: 'Aggressive',
        icon: '🔥',
      },
      {
        value: MaxDrawdown.OVER_FIFTY_PERCENT,
        label: '50%+',
        description: 'Very aggressive',
        icon: '😈',
      },
    ],
  },
  {
    id: ASSESSMENT_SCHEMA_KEYS.portfolioDropReaction,
    icon: '🚧',
    title: 'If your portfolio dropped 20% tomorrow, you would:',
    subtitle: 'This tells us about your risk tolerance',
    type: 'buttons',
    required: true,
    options: [
      {
        value: PortfolioDropReaction.SELL_EVERYTHING,
        label: 'Sell everything',
        description: 'Cut losses immediately',
        icon: '😰',
      },
      {
        value: PortfolioDropReaction.SELL_SOME,
        label: 'Sell some',
        description: 'Reduce exposure',
        icon: '😟',
      },
      {
        value: PortfolioDropReaction.HOLD,
        label: 'Hold steady',
        description: 'Wait it out',
        icon: '😐',
      },
      {
        value: PortfolioDropReaction.BUY_MORE,
        label: 'Buy more',
        description: 'See it as opportunity',
        icon: '😎',
      },
    ],
  },
  {
    id: ASSESSMENT_SCHEMA_KEYS.incomeStability,
    icon: '🏠',
    title: 'How stable is your income?',
    subtitle: 'This affects your risk capacity',
    type: 'buttons',
    required: true,
    options: [
      {
        value: IncomeStability.VERY_UNSTABLE,
        label: 'Very unstable',
        description: 'Irregular income',
        icon: '📉',
      },
      {
        value: IncomeStability.UNSTABLE,
        label: 'Somewhat unstable',
        description: 'Variable income',
        icon: '📊',
      },
      {
        value: IncomeStability.STABLE,
        label: 'Stable',
        description: 'Regular paycheck',
        icon: '📈',
      },
      {
        value: IncomeStability.VERY_STABLE,
        label: 'Very stable',
        description: 'Government/tenured',
        icon: '🏛️',
      },
    ],
  },
  {
    id: ASSESSMENT_SCHEMA_KEYS.emergencyFundMonths,
    icon: '🏦',
    title: 'How many months of expenses do you have saved?',
    subtitle: 'Emergency fund affects investment risk',
    type: 'buttons',
    required: true,
    options: [
      {
        value: EmergencyFundMonths.ZERO_TO_ONE,
        label: '0-1 months',
        description: 'Building emergency fund',
        icon: '🏗️',
      },
      {
        value: EmergencyFundMonths.TWO_TO_THREE,
        label: '2-3 months',
        description: 'Getting there',
        icon: '🚧',
      },
      {
        value: EmergencyFundMonths.FOUR_TO_SIX,
        label: '4-6 months',
        description: 'Good coverage',
        icon: '✅',
      },
      {
        value: EmergencyFundMonths.SIX_PLUS,
        label: '6+ months',
        description: 'Excellent safety net',
        icon: '🛡️',
      },
    ],
  },
  {
    id: ASSESSMENT_SCHEMA_KEYS.cryptoComfort,
    icon: '🔐',
    title: 'How comfortable are you with crypto?',
    subtitle: 'This affects portfolio diversification',
    type: 'buttons',
    required: true,
    options: [
      {
        value: CryptoComfort.NOT_COMFORTABLE,
        label: 'Not comfortable',
        description: 'Stick to traditional',
        icon: '🏦',
      },
      {
        value: CryptoComfort.SLIGHTLY,
        label: 'Slightly comfortable',
        description: 'Maybe a small amount',
        icon: '🤔',
      },
      {
        value: CryptoComfort.COMFORTABLE,
        label: 'Comfortable',
        description: 'Open to crypto',
        icon: '💎',
      },
      {
        value: CryptoComfort.VERY_COMFORTABLE,
        label: 'Very comfortable',
        description: 'Crypto enthusiast',
        icon: '🚀',
      },
    ],
  },
  {
    id: ASSESSMENT_SCHEMA_KEYS.goalCriticality,
    icon: '🎯',
    title: 'How critical is this financial goal?',
    subtitle: 'This affects our recommended approach',
    type: 'buttons',
    required: true,
    options: [
      {
        value: GoalCriticality.CRITICAL_CANT_LOSE,
        label: "Critical - can't lose",
        description: 'Must achieve this goal',
        icon: '🎯',
      },
      {
        value: GoalCriticality.IMPORTANT,
        label: 'Important',
        description: 'Really want to achieve',
        icon: '⭐',
      },
      {
        value: GoalCriticality.FLEXIBLE,
        label: 'Flexible',
        description: 'Nice to have',
        icon: '🤷',
      },
      {
        value: GoalCriticality.OPTIONAL_ASPIRATIONAL,
        label: 'Optional/Aspirational',
        description: 'If it happens, great!',
        icon: '✨',
      },
    ],
  },
  {
    id: ASSESSMENT_SCHEMA_KEYS.pastLossReaction,
    icon: '🚧',
    title: "When you've lost money before, you:",
    subtitle: 'Past behavior predicts future behavior',
    type: 'buttons',
    required: true,
    options: [
      {
        value: PastLossReaction.PANICKED_SOLD,
        label: 'Panicked and sold',
        description: 'Got out immediately',
        icon: '😱',
      },
      {
        value: PastLossReaction.UNCOMFORTABLE,
        label: 'Felt uncomfortable',
        description: 'Worried but held on',
        icon: '😰',
      },
      {
        value: PastLossReaction.MANAGED_FINE,
        label: 'Managed fine',
        description: 'Stayed calm',
        icon: '😌',
      },
      {
        value: PastLossReaction.UNBOTHERED,
        label: "Wasn't bothered",
        description: 'Part of the process',
        icon: '😎',
      },
    ],
  },
  {
    id: ASSESSMENT_SCHEMA_KEYS.rebalancingWillingness,
    icon: '⚖️',
    title: 'How often are you willing to rebalance?',
    subtitle: 'This affects portfolio maintenance',
    type: 'buttons',
    required: true,
    options: [
      {
        value: RebalancingWillingness.UNLIKELY,
        label: 'Rarely/never',
        description: 'Set and forget',
        icon: '😴',
      },
      {
        value: RebalancingWillingness.MAYBE,
        label: 'Maybe occasionally',
        description: 'When I remember',
        icon: '🤔',
      },
      {
        value: RebalancingWillingness.YES_QUARTERLY_ANNUALLY,
        label: 'Quarterly/Annually',
        description: 'Regular check-ins',
        icon: '📅',
      },
      {
        value: RebalancingWillingness.AUTOMATED_IS_FINE,
        label: 'Automated is fine',
        description: 'Let the system handle it',
        icon: '🤖',
      },
    ],
  },
];
