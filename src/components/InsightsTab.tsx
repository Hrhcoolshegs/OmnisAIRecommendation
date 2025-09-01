import React from 'react';
import { TrendingUp, PieChart, BarChart3, Target, Calendar } from 'lucide-react';

export default function InsightsTab() {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const insights = [
    {
      title: 'Monthly Spending',
      value: '₦45,000',
      change: '-12%',
      positive: true,
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Savings Rate',
      value: '15%',
      change: '+5%',
      positive: true,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Investment Growth',
      value: '₦5,000',
      change: '+8%',
      positive: true,
      icon: PieChart,
      color: 'purple'
    },
    {
      title: 'Goal Progress',
      value: '10%',
      change: '+10%',
      positive: true,
      icon: Target,
      color: 'orange'
    }
  ];

  const spendingCategories = [
    { name: 'Food & Dining', amount: 15000, percentage: 33, color: 'bg-blue-500' },
    { name: 'Transportation', amount: 8000, percentage: 18, color: 'bg-green-500' },
    { name: 'Shopping', amount: 12000, percentage: 27, color: 'bg-purple-500' },
    { name: 'Bills & Utilities', amount: 10000, percentage: 22, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Financial Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className={`w-4 h-4 text-${insight.color}-600`} />
                  <span className="text-sm font-medium text-gray-700">{insight.title}</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{insight.value}</p>
                <p className={`text-xs ${insight.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {insight.change} from last month
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spending Breakdown */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Spending Breakdown</h3>
          <button className="flex items-center space-x-1 text-blue-600 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            <span>This Month</span>
          </button>
        </div>

        <div className="space-y-4">
          {spendingCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                <span className="text-sm font-bold text-gray-900">{formatCurrency(category.amount)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${category.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{category.percentage}% of total spending</p>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Smart Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <TrendingUp className="w-3 h-3 text-blue-600" />
            </div>
            <p className="text-sm text-blue-800">
              Your spending decreased by 12% this month. Great job on managing your expenses!
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <Target className="w-3 h-3 text-green-600" />
            </div>
            <p className="text-sm text-blue-800">
              You're on track to save ₦18,000 this month if you maintain current spending patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}