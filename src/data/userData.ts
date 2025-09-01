import { User, Recommendation } from '../types/user';

export const dummyUser: User = {
  name: "Oluwasegun Lawrence",
  age: 30,
  occupation: "SME Owner",
  incomeBracket: "Middle Income (₦50,000 - ₦200,000)",
  accountBalance: 1200000,
  recentTransaction: {
    amount: 15000,
    type: 'deposit',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  monthlyIncome: 850000,
  demographics: {
    nationality: "Nigerian",
    gender: "Male",
    language: "English"
  }
};

export const flexibleSavingsRecommendation: Recommendation = {
  id: "flexible-savings-001",
  title: "Flexible Savings Plan",
  description: "Save more with our Flexible Savings Plan. Get high interest on your deposits with the flexibility to withdraw when needed.",
  context: `Based on your recent deposit of ₦${dummyUser.recentTransaction.amount.toLocaleString()}, we recommend starting a savings plan to maximize your returns.`,
  minimumAmount: 5000,
  benefits: [
    "Competitive 12% annual interest rate",
    "No lock-in period - withdraw anytime",
    "Zero maintenance fees",
    "Automatic interest calculations",
    "Mobile-first banking experience"
  ]
};