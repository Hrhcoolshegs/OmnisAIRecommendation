export interface User {
  name: string;
  age: number;
  occupation: string;
  incomeBracket: string;
  accountBalance: number;
  recentTransaction: {
    amount: number;
    type: 'deposit' | 'withdrawal';
    timestamp: string;
  };
  monthlyIncome: number;
  demographics: {
    nationality: string;
    gender: string;
    language: string;
  };
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  context: string;
  minimumAmount: number;
  benefits: string[];
}

export interface TransactionResult {
  success: boolean;
  message: string;
  amount: number;
  planName: string;
}