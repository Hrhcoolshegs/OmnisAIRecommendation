import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Calendar, Filter } from 'lucide-react';

export default function TransactionHistory() {
  const transactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 15000,
      description: 'Bank Transfer',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed'
    },
    {
      id: '2',
      type: 'savings',
      amount: 5000,
      description: 'Flexible Savings Plan',
      date: '2024-01-15',
      time: '15:45',
      status: 'completed'
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: 2500,
      description: 'ATM Withdrawal',
      date: '2024-01-14',
      time: '10:15',
      status: 'completed'
    },
    {
      id: '4',
      type: 'deposit',
      amount: 25000,
      description: 'Salary Credit',
      date: '2024-01-10',
      time: '09:00',
      status: 'completed'
    }
  ];

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Transaction History</h3>
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
            <Calendar className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                transaction.type === 'deposit' || transaction.type === 'savings'
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}>
                {transaction.type === 'deposit' || transaction.type === 'savings' ? (
                  <ArrowDownLeft className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date} • {transaction.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${
                transaction.type === 'deposit' || transaction.type === 'savings'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {transaction.type === 'withdrawal' ? '-' : '+'}{formatCurrency(transaction.amount)}
              </p>
              <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 text-blue-600 font-semibold text-sm hover:bg-blue-50 rounded-xl transition-colors duration-200">
        View All Transactions
      </button>
    </div>
  );
}